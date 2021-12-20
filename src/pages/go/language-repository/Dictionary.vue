<template>
    <div class="q-pa-md">
        <q-table
          title="Treats"
          :rows="apiData.results"
          :columns="columns"
          row-key="ID"
          :selected-rows-label="getSelected"
          selection="multiple"
          v-model:selected="selected"
        >
        <template v-slot:top>
          <q-input dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
          <q-btn color="primary" :disable="loading" label="Add row" @click="addDialogVisit" />
          <q-btn class="q-ml-sm" color="denger" :disable="loading" label="Remove row" @click="removeRow" />
        </template>
        </q-table>
    </div>
    <q-dialog v-model="addDialog">
      <q-card style="min-width: 350px">

        <q-card-section>
          <div class="text-h6">英文</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="add.english" autofocus @keyup.enter="addDialog = false" />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">中文</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="add.chinese" autofocus @keyup.enter="addDialog = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="關閉" v-close-popup />
          <q-btn flat label="新增" v-close-popup @click="addRow" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { goLanguageRepositoryApi } from 'boot/axios'
interface Row {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    user_id: number;
    language: {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string;
      dictionary_id: number;
      english: string;
      chinese: string;
    }
}

interface AddResponse {
  status: string;
  results: Row;
}

const columns = [
  {
    name: 'ID',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row:Row) => row.ID,
    format: (val:string) => `${val}`,
    sortable: true
  },
  { name: 'english', align: 'left', label: '英文', field: (row:Row) => row.language.english, sortable: true },
  { name: 'chinese', align: 'left', label: '中文', field: (row:Row) => row.language.chinese, sortable: true },
  { name: 'CreatedAt', align: 'left', label: '建立時間', field: 'CreatedAt', sortable: true },
  { name: 'UpdatedAt', align: 'left', label: '更新時間', field: 'UpdatedAt', sortable: true },
]

export default {
  setup () {
    const $q = useQuasar()
    let apiData = reactive({
      results: [] as Row[]
    })
    const filter = ref('')
    const loading = ref(false)
    const addDialog = ref(false)
    const selected = ref([])
    const add = reactive({
      english: '',
      chinese: '',
    })

    const setApiData = (data:Row[]) => {
      apiData.results = data
    }

    const getApiData = async () => {
      return await goLanguageRepositoryApi.get<Row[]>('api/v1/dictionary').then((response) => {
        const { data } = response
        setApiData(data)
      })
    }
  
    onMounted(getApiData)

    return {
        columns,
        filter,
        loading,
        selected,
        addDialog,
        add,

        apiData,
        setApiData,
        getApiData,

        getSelected() {
          return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${apiData.results.length}`
        },

        addDialogVisit() {
          addDialog.value = true
        },

        async addRow() {
          return await goLanguageRepositoryApi.post<AddResponse>('api/v1/dictionary', add).then((response) => {
            if(response.data.status === 'success'){
              $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: '新增成功'
              })
              return getApiData()
            }
          })
        },

        async removeRow() {
          const results:Promise<void>[] = []
          selected.value.forEach((row: Row, index: number) => {
            results.push(goLanguageRepositoryApi.delete(`api/v1/dictionary/${row.ID}`).then(() => {
              $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: '刪除成功'
              })
            }))
            delete selected.value[index]
          })
          await Promise.all(results)
          await getApiData()
        },
    }
  }
}
</script>