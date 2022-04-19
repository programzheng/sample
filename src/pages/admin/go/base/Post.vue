<template>
  <div class="q-pa-md">
      <ActionBar
        :addRowButtondisabled="addRowButtondisabled"
        :addRowClick="addRowClick"
        :editRowClick="editRowClick"
        :editRowButtonDisabled="editRowButtondisabled"
        :removeRowButtonDisabled="removeRowButtonDisabled"
      />
      <q-table
        title="Post"
        :rows="apiData.results"
        :columns="columns"
        row-key="id"
        :selected-rows-label="getSelected"
        selection="multiple"
        v-model:selected="selected"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        @request="onRequest"
        binary-state-sort
      >
        <template v-slot:top>
          <q-input dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            size="sm"
          />
        </div>
      </q-table>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import ActionBar from 'components/ActionBar.vue'
import AddRowDialog from 'src/components/AddRowDialog.vue'
import EditRowDialog from 'src/components/EditRowDialog.vue'
import { useQuasar } from 'quasar'
import { goBaseAdminApi } from 'boot/axios'
interface Pagination {
  sortBy: string,
  descending: boolean,
  page: number,
  rowsPerPage: number,
  rowsNumber: number
}

interface Props{
  pagination: Pagination,
  filter: string|undefined
}

interface Response {
  code: number,
  value: ResponseValue
}

interface ResponseValue {
  list:Row[],
  page:{
    page_num: number,
    page_size: number,
  },
  total: number,
}

interface Row {
	id: number;
  title: string;
  summary: string;
  detail: string;
  files: string[];
}

interface Request {
  title: string;
  summary: string;
}

const columns = [
  {
    name: 'id',
    required: true,
    label: 'id',
    align: 'left',
    field: (row:Row) => row.id,
    format: (val:string) => `${val}`,
    sortable: true
  },
  { name: 'title', align: 'left', label: '標題', field: (row:Row) => row.title, sortable: true },
  { name: 'summary', align: 'left', label: '簡介', field: (row:Row) => row.summary, sortable: true },
  { name: 'detail', align: 'left', label: '內容', field: (row:Row) => row.detail, sortable: true },
  { name: 'created_at', align: 'left', label: '建立時間', field: 'created_at', sortable: true },
  { name: 'updated_at', align: 'left', label: '更新時間', field: 'updated_at', sortable: true },
  { name: 'deleted_at', align: 'left', label: '刪除時間', field: 'deleted_at', sortable: true },
]

const units = [
  {
    type: 'input',
    label: '標題',
    name: 'title'
  },
  {
    type: 'input',
    label: '簡介',
    name: 'summary'
  },
  {
    type: 'input',
    label: '內容',
    name: 'detail'
  }
]

export default {
  components: {
    ActionBar
  },
  setup () {
    const $q = useQuasar()
    let apiData = reactive({
      results: [] as Row[],
      total: 0
    })
    const loading = ref(false)
    const filter = ref('')
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 0
    })

    const selected = ref([])

    function getRowsNumberCount () {
      return apiData.total
    }

    const onRequest = async (props:Props):Promise<void> => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true

      // get all rows if "All" (0) is selected
      const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

      // fetch data from "server"
      await getApiData(page, fetchCount, filter, sortBy, descending)

      // update rowsCount with appropriate value
      pagination.value.rowsNumber = getRowsNumberCount()

      // don't forget to update local pagination object
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending

      // ...and turn of loading indicator
      loading.value = false
    }

    const setApiData = (value:ResponseValue) => {
      apiData.results = value.list
      apiData.total = value.total
    }

    const getApiData = async (
      page: number,
      fetchCount: number,
      filter: string|undefined,
      sortBy: string,
      descending: boolean,
    ) => {
      const pageNum = page
      const pageSize = fetchCount
      let url = `api/v1/posts?page_num=${pageNum}&page_size=${pageSize}&filter=${filter || ''}`

      return await goBaseAdminApi.get<Response>(url).then((response) => {
        const { data } = response
        // handle sortBy
        if (sortBy) {
          const sortFn = sortBy === 'desc'
            ? (descending
                ? (a:Row, b:Row) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0)
                : (a:Row, b:Row) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
              )
            : (descending
                ? (a:Row, b:Row) => (parseFloat(b[ sortBy as keyof Row ] as string) - parseFloat(a[ sortBy as keyof Row ] as string))
                : (a:Row, b:Row) => (parseFloat(a[ sortBy as keyof Row ] as string) - parseFloat(b[ sortBy as keyof Row ] as string))
              )
          data.value.list.sort(sortFn)
        }
        setApiData(data.value)
      })
    }

    const getSelected = () => {
      return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${apiData.results.length}`
    }

    const addRowButtondisabled = ref(false)
    const addRowClick = () => {
      $q.dialog({
        component: AddRowDialog,
        componentProps: {
          units: units,
        }
      }).onOk((unitsRequest:Request) => {
          void (async () => {
            await goBaseAdminApi.post<Response>('api/v1/posts', unitsRequest).then((response) => {
              if(response.data.code === 200){
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  icon: 'cloud_done',
                  message: '新增成功'
                })
                return getApiData(0,5,undefined,'id', false)
              }
            })

          })()
      })
    }

    const editRowButtondisabled = computed(() => {
      return selected.value.length ? false : true
    })
    const editRowClick = () => {
      $q.dialog({
        component: EditRowDialog,
        componentProps: {
          units: units,
          selected: selected.value as Row[]
        }
      }).onOk((unitsRequest:Request) => {
          void (async () => {
            await goBaseAdminApi.put<Response>('api/v1/posts', unitsRequest).then((response) => {
              if(response.data.code === 200){
                $q.notify({
                  color: 'green-4',
                  textColor: 'white',
                  icon: 'cloud_done',
                  message: '新增成功'
                })
                return getApiData(0,5,undefined,'id', false)
              }
            })

          })()
      })
    }

    const removeRowButtonDisabled = computed(() => {
      return selected.value.length ? false : true
    })

    let pagesNumber = computed(() => {
      return Math.ceil(apiData.total / pagination.value.rowsPerPage)
    })

    onMounted(async () => {
      await onRequest({
        pagination: pagination.value,
        filter: undefined
      })
      pagesNumber = computed(() => {
        return Math.ceil(apiData.total / pagination.value.rowsPerPage)
      })
    })

    return {
        columns,
        filter,
        loading,
        pagination,
        pagesNumber,
        onRequest,
        selected,
        units,
        addRowButtondisabled,
        addRowClick,
        editRowButtondisabled,
        editRowClick,
        removeRowButtonDisabled,

        apiData,
        setApiData,
        getApiData,

        getSelected
    }
  }
}
</script>
