<style lang="scss" scoped>
.portfolio{
  width: 80%;
  margin: 20px;
}
.icon-link{
  margin: 5px;
  color: inherit;
  text-decoration: none;
}
.column + .column{
  margin-top: 1rem;
}
</style>

<template>
  <q-page class="column items-center justify-evenly fit">
    <div class="row items-center justify-around portfolio">
      <div class="col-5">
        <q-card flat bordered>
          <!-- <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          /> -->

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Golang</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">go-ptt-crawler</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gin</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Colly</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">AWS Lambda</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
          <a class="icon-link" href="https://github.com/programzheng/go-ptt-crawler">
            <q-icon name="ion-logo-github" size="md"></q-icon>
          </a>
          <a class="icon-link" target="_blank" href="https://9hbg24cbkj.execute-api.us-east-1.amazonaws.com/ptt/image/Notebook/random">
            <q-icon name="laptop" size="md">
              <q-tooltip>
                隨機取得ptt Notebook版的文章圖片
              </q-tooltip>
            </q-icon>
          </a>
          <a class="icon-link" target="_blank" href="https://9hbg24cbkj.execute-api.us-east-1.amazonaws.com/ptt/image/Soft_Job/random">
            <q-icon name="work" size="md">
              <q-tooltip>
                隨機取得ptt Soft_Job版的文章圖片
              </q-tooltip>
            </q-icon>
          </a>

            <q-space />

          </q-card-actions>
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">PTT自定義看板取得文章內文圖片</div>
          <div class="text-body1">
            藉由把PTT看板名稱帶到網址上的parameter，取得指定看板內隨機文章內的隨機一張圖片或是取得指定看板一定數量的文章內的所有圖片轉為JSON檔案。運用無服務器架構，部署於AWS的Lambda。
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-around portfolio">
      <div class="col-5">
        <q-card flat bordered>
          <!-- <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          /> -->

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Golang</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">base</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gin</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GRPC</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gorm</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">ＭySQL</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Docker</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GCP Compute Engine</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
            <a class="icon-link" href="https://github.com/programzheng/base">
              <q-icon name="ion-logo-github" size="md"></q-icon>
            </a>
            <a class="icon-link" href="/admin/go/base">
              <q-icon name="admin_panel_settings" size="md">
              <q-tooltip>
                進入後台
              </q-tooltip>
              </q-icon>
            </a>

            <q-space />

            <!-- <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            /> -->
          </q-card-actions>

          <!-- <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition> -->
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">微服務基礎底層</div>
          <div class="text-body1">
            設計作為微服務架構內基礎功能的實現，並利用HTTP API與GRPC與其他微服務做溝通。部署於GCP的Compute Engine。
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-around portfolio">
      <div class="col-5">
        <q-card flat bordered>
          <!-- <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          /> -->

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Golang</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">games</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">GRPC</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gorm</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">ＭySQL</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Docker</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GCP Compute Engine</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
            <a class="icon-link" href="https://github.com/programzheng/games">
              <q-icon name="ion-logo-github" size="md"></q-icon>
            </a>

            <q-space />

            <!-- <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            /> -->
          </q-card-actions>

          <!-- <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition> -->
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">微服務-遊戲</div>
          <div class="text-body1">
            此專案用途用於實現高流量遊戲、抽獎的實作，讓其它微服務可以藉由GRPC進行調用並將遊戲等資料統合在此專案上。部署於GCP的Compute Engine。
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-around portfolio">
      <div class="col-5">
        <q-card flat bordered>
          <!-- <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          /> -->

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Golang</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">language-repository</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">Fiber</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gorm</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">ＭySQL</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GCP Compute Engine</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
          <a class="icon-link" href="https://github.com/programzheng/language-repository">
            <q-icon name="ion-logo-github" size="md"></q-icon>
          </a>
          <a class="icon-link" href="/go/language-repository">
            <q-icon name="admin_panel_settings" size="md">
              <q-tooltip>
                進入管理介面
              </q-tooltip>
            </q-icon>
          </a>
          <a class="icon-link" href="https://hub.docker.com/repository/docker/programzheng/language-repository">
            <q-icon :name="ionLogoDocker" size="md"></q-icon>
          </a>

            <q-space />

          </q-card-actions>
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">i18n翻譯文字管理</div>
          <div class="text-body1">
            可於管理介面新增自己所需要的中英文對照文字並提供API給其他微服務使用，讓其他微服務可用於更換語系。部署於GCP的Compute Engine。
          </div>
          <div class="text-caption q-mt-sm">
            訪客帳號密碼：<br/>
            Account: guest<br/>
            Password: guest
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-around portfolio">
      <div class="col-5">
        <q-card flat bordered>
          <!-- <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          /> -->

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Golang</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">go-auth</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">Fiber</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gorm</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">ＭySQL</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GCP Compute Engine</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
          <a class="icon-link" href="https://github.com/programzheng/go-auth">
            <q-icon name="ion-logo-github" size="md"></q-icon>
          </a>
          <a class="icon-link" href="https://hub.docker.com/repository/docker/programzheng/go-auth">
            <q-icon :name="ionLogoDocker" size="md"></q-icon>
          </a>

            <q-space />

          </q-card-actions>
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">OAuth第三方服務</div>
          <div class="text-body1">
            用於串接外部第三方OAuth登入註冊為會員的服務，集合所有OAuth會員資訊於此服務上。部署於GCP的Compute Engine。
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-around portfolio">
      <div class="col-5">
        <q-card flat bordered>
          <!-- <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          /> -->

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Golang</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">black-Key</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gin</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Gorm</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">LINE Messaging API</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">ＭySQL</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Docker</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GCP Compute Engine</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
            <a class="icon-link" href="https://github.com/programzheng/black-key">
              <q-icon name="ion-logo-github" size="md"></q-icon>
            </a>
            <a class="icon-link" href="https://hub.docker.com/repository/docker/programzheng/black-key">
              <q-icon :name="ionLogoDocker" size="md"></q-icon>
            </a>

            <q-space />

            <!-- <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            /> -->
          </q-card-actions>

          <!-- <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition> -->
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">LINE Bot</div>
          <div class="text-body1">
            串接LINE的Messaging API推播訊息，有提醒工作事項的通知、群組分帳、群組小遊戲等等可用於交互聊天訊息或是推播訊息用途的功能。部署於GCP的Compute Engine。
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-around portfolio">
      <div class="col-5">
        <q-card flat bordered>
          <!-- <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          /> -->

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Python</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">LINE-key-support</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">Python</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">BeautifulSoup</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">FastAPI</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Javascript</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Docker</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GCP Compute Engine</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
            <a class="icon-link" href="https://github.com/programzheng/web-crawler">
              <q-icon name="ion-logo-github" size="md">
                <q-tooltip>
                後端Python爬蟲
                </q-tooltip>
              </q-icon>
            </a>
            <a class="icon-link" href="https://github.com/programzheng/line-key-support">
              <q-icon name="ion-logo-github" size="md">
                <q-tooltip>
                LIFF前端畫面
                </q-tooltip>
              </q-icon>
            </a>
            <a class="icon-link" href="https://hub.docker.com/repository/docker/programzheng/web-crawler">
              <q-icon :name="ionLogoDocker" size="md">
                <q-tooltip>
                  後端Python爬蟲Docker Image
                </q-tooltip>
              </q-icon>
            </a>
            <a class="icon-link" href="https://liff.line.me/1655758300-4G7poLbg">
              <q-icon name="question_answer" size="md">
              </q-icon>
            </a>

            <q-space />

            <!-- <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            /> -->
          </q-card-actions>

          <!-- <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition> -->
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">LINE輔助聊天</div>
          <div class="text-body1">
            讓使用者可以於LINE的畫面把從Python爬蟲回來的梗圖隨機傳送一張到LINE的聊天室內。前端畫面的部分用LINE的LIFF前端框架，後端爬蟲的部分使用Python的BeautifulSoup，取得爬蟲結果的API部分使用FastAPI framework。部署於GCP的Compute Engine。
          </div>
          <div class="text-body2 text-red-6">
            LIFF只能在LINE上開啟此<a href="https://liff.line.me/1655758300-4G7poLbg">連結</a>才能有完整功能
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-around portfolio">
      <div class="col-5">
        <q-card flat bordered>
          <!-- <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          /> -->

          <q-card-section class="q-pb-none">
            <div class="text-overline text-blue-6">Node.js</div>
            <div class="text-h5 text-bold q-mt-sm q-mb-xs">node-messaging-socket</div>
            <div class="row q-mt-sm items-start justify-start">
              <div class="q-pr-xs">
                <q-badge color="grey-14">Node</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Socket.IO</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Sequelize</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">ＭySQL</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Nodemailer</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">Docker</q-badge>
              </div>
              <div class="q-pr-xs">
                <q-badge color="grey-14">GCP Compute Engine</q-badge>
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
            <a class="icon-link" href="https://github.com/programzheng/node-messaging-socket">
              <q-icon name="ion-logo-github" size="md"></q-icon>
            </a>
            <a class="icon-link" href="https://hub.docker.com/repository/docker/programzheng/node-messaging-socket">
              <q-icon :name="ionLogoDocker" size="md"></q-icon>
            </a>

            <q-space />

            <!-- <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            /> -->
          </q-card-actions>

          <!-- <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition> -->
        </q-card>
      </div>
      <div class="col-4">
        <div>
          <div class="text-overline text-green-9">Summary</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-bold">網頁即時聊天室</div>
          <div class="text-body1">
            使用Node.js建立基本的登入註冊使用者與寄送驗證信，聊天室功能用Socket.IO做到即時通訊的功能。部署於GCP的Compute Engine。
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ionLogoDocker } from '@quasar/extras/ionicons-v5'

export default defineComponent({
  name: 'Portfolio',
  setup () {
    return {
      ionLogoDocker: ionLogoDocker,
      expanded: ref(false)
    }
  }
});
</script>
