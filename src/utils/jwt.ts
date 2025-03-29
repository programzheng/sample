import * as jose from 'jose';
import jwtDecode from 'jwt-decode';

// JWT 本地存儲的鍵名常數
const JWT_STORAGE_KEYS = {
  ENABLED: 'jwt_storage_enabled', // 存儲開關狀態的鍵名
  PAYLOAD: 'jwt_payload',
  SECRET: 'jwt_secret',
  ALGORITHM: 'jwt_algorithm',
  EXPIRES_IN: 'jwt_expires_in'
} as const;

interface JwtPayload {
  [key: string]: unknown;
  exp?: number;
  iat?: number;
}

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

interface JwtDecodeOptions {
  complete?: boolean;
}

interface JwtStoredConfig {
  payload: JwtPayload;
  secret: string;
  algorithm: string;
  expiresIn: string;
}

/**
 * JWT工具類 - 用於產生和解析JWT
 */
export default class JwtUtil {
  /**
   * 檢查本地存儲功能是否啟用
   */
  static isStorageEnabled(): boolean {
    return localStorage.getItem(JWT_STORAGE_KEYS.ENABLED) === 'true';
  }

  /**
   * 啟用本地存儲功能
   */
  static enableStorage(): void {
    localStorage.setItem(JWT_STORAGE_KEYS.ENABLED, 'true');
  }

  /**
   * 禁用本地存儲功能
   * 同時會清除所有已存儲的配置
   */
  static disableStorage(): void {
    localStorage.setItem(JWT_STORAGE_KEYS.ENABLED, 'false');
    this.clearStoredConfig();
  }

  /**
   * 從本地存儲中獲取JWT配置
   */
  static getStoredConfig(): JwtStoredConfig {
    // 如果存儲功能未啟用，返回預設值
    if (!this.isStorageEnabled()) {
      return {
        payload: {},
        secret: '',
        algorithm: 'HS256',
        expiresIn: ''
      };
    }

    const storedPayload = localStorage.getItem(JWT_STORAGE_KEYS.PAYLOAD);
    const parsedPayload = storedPayload ? JSON.parse(storedPayload) as JwtPayload : {};

    return {
      payload: parsedPayload,
      secret: localStorage.getItem(JWT_STORAGE_KEYS.SECRET) || '',
      algorithm: localStorage.getItem(JWT_STORAGE_KEYS.ALGORITHM) || 'HS256',
      expiresIn: localStorage.getItem(JWT_STORAGE_KEYS.EXPIRES_IN) || ''
    };
  }

  /**
   * 保存JWT配置到本地存儲
   */
  static saveConfig(config: Partial<JwtStoredConfig>) {
    // 如果存儲功能未啟用，直接返回
    if (!this.isStorageEnabled()) {
      return;
    }

    if (config.payload) {
      localStorage.setItem(JWT_STORAGE_KEYS.PAYLOAD, JSON.stringify(config.payload));
    }
    if (config.secret) {
      localStorage.setItem(JWT_STORAGE_KEYS.SECRET, config.secret);
    }
    if (config.algorithm) {
      localStorage.setItem(JWT_STORAGE_KEYS.ALGORITHM, config.algorithm);
    }
    if (config.expiresIn) {
      localStorage.setItem(JWT_STORAGE_KEYS.EXPIRES_IN, config.expiresIn);
    }
  }

  /**
   * 清除本地存儲的JWT配置
   */
  static clearStoredConfig() {
    localStorage.removeItem(JWT_STORAGE_KEYS.PAYLOAD);
    localStorage.removeItem(JWT_STORAGE_KEYS.SECRET);
    localStorage.removeItem(JWT_STORAGE_KEYS.ALGORITHM);
    localStorage.removeItem(JWT_STORAGE_KEYS.EXPIRES_IN);
  }

  /**
   * 產生JWT，優先使用傳入的參數，如果沒有則使用本地存儲的值（當本地存儲功能啟用時）
   */
  static async generate(
    payload?: JwtPayload,
    secret?: string,
    options?: { algorithm?: string; expiresIn?: string }
  ): Promise<string> {
    const storedConfig = this.getStoredConfig();

    // 使用傳入的參數或本地存儲的值（如果啟用了本地存儲）
    const finalPayload = payload || (this.isStorageEnabled() ? storedConfig.payload : {});
    const finalSecret = secret || (this.isStorageEnabled() ? storedConfig.secret : '');
    const finalOptions = {
      algorithm: options?.algorithm || storedConfig.algorithm,
      expiresIn: options?.expiresIn || (this.isStorageEnabled() ? storedConfig.expiresIn : '')
    };

    // 如果沒有密鑰，拋出錯誤
    if (!finalSecret) {
      throw new Error('Secret is required to generate JWT');
    }

    // 創建密鑰
    const secretKey = new TextEncoder().encode(finalSecret);

    // 處理過期時間
    if (finalOptions.expiresIn) {
      const duration = parseDuration(finalOptions.expiresIn);
      if (duration) {
        const now = Math.floor(Date.now() / 1000);
        finalPayload.exp = now + duration;
      }
    }

    // 保存使用的配置（如果啟用了本地存儲）
    this.saveConfig({
      payload: finalPayload,
      secret: finalSecret,
      algorithm: finalOptions.algorithm,
      expiresIn: finalOptions.expiresIn
    });

    // 簽名JWT
    return await new jose.SignJWT(finalPayload)
      .setProtectedHeader({ alg: finalOptions.algorithm })
      .sign(secretKey);
  }

  /**
   * 解析JWT
   * @param token JWT字符串
   * @param options 選項
   * @returns 解析後的載荷
   */
  static decode<T = JwtPayload>(token: string, options?: JwtDecodeOptions): T | DecodedJwt {
    if (options?.complete) {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      // 解碼header和payload
      const headerString = atob(parts[0]);
      const payloadString = atob(parts[1]);

      // 明確指定解析後的類型
      const header = JSON.parse(headerString) as Record<string, unknown>;
      const payload = JSON.parse(payloadString) as Record<string, unknown>;

      const result: DecodedJwt = {
        header,
        payload,
        signature: parts[2]
      };

      return result as unknown as T;
    }

    return jwtDecode<T>(token);
  }

  /**
   * 驗證JWT
   * @param token JWT字符串
   * @param secret 密鑰
   * @returns 驗證結果
   */
  static async verify(token: string, secret: string): Promise<JwtPayload | string> {
    try {
      const secretKey = new TextEncoder().encode(secret);
      const { payload } = await jose.jwtVerify(token, secretKey);
      return payload as JwtPayload;
    } catch (error) {
      return '';
    }
  }

  /**
   * 檢查JWT是否過期
   * @param token JWT字符串
   * @returns 是否過期
   */
  static isExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // JWT過期時間是以秒為單位的時間戳
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp < currentTime : true;
    } catch (error) {
      return true;
    }
  }
}

/**
 * 解析時間字串為秒
 * @param duration 時間字串，如 '1h', '7d'
 * @returns 秒數
 */
function parseDuration(duration: string): number | null {
  const regex = /^(\d+)([smhdw])$/;
  const match = regex.exec(duration);

  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers: Record<string, number> = {
    s: 1,            // 秒
    m: 60,           // 分
    h: 60 * 60,      // 小時
    d: 24 * 60 * 60, // 天
    w: 7 * 24 * 60 * 60 // 週
  };

  return value * multipliers[unit];
}
