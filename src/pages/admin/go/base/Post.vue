<template>
  <div class="q-pa-md">
      <ActionBar
        :addRowButtondisabled="addRowButtondisabled"
        :addRowClick="addRowClick"
        :editRowButtonDisabled="editRowButtondisabled"
        :editRowClick="editRowClick"
        :removeRowButtonDisabled="removeRowButtonDisabled"
        :removeRowClick="removeRowClick"
      />
      <ApiTable
        :title="'Post'"
        :getApiData="getApiData"
        :setApiData="setApiData"
        :rowKey="rowKey"
        :columns="columns"
        :ref="el => { table = el }"
      />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import ActionBar from 'components/ActionBar.vue'
import AddRowDialog from 'src/components/AddRowDialog.vue'
import EditRowDialog from 'src/components/EditRowDialog.vue'
import RemoveRowDialog from 'src/components/RemoveRowDialog.vue'
import ApiTable from 'src/components/ApiTable.vue'
import { ApiData, Response, ResponseValue } from 'src/components/api'
import { Pagination, OnRequest } from 'src/components/api-table'
import { useQuasar } from 'quasar'
import { goBaseAdminApi } from 'boot/axios'

interface File {
  hash_id: string;
  type: string;
  value: string;
}

interface Row {
	id: number;
  title: string;
  summary: string;
  detail: string;
  files: File[];
}

export default defineComponent({
  components: {
    ActionBar,
    ApiTable
  },
  setup () {
    const $q = useQuasar()
    const rowKey = 'id'
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
      { name: 'file', align: 'left', label: '圖片', field: (row:Row) => row.files, sortable: true },
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
      },
      {
        type: 'base64_files',
        label: '圖片',
        name: 'files'
      }
    ]

    // const apiData = computed(() => {
    //   if(table.value && table.value['apiData']){
    //     return table.value['apiData']
    //   }
    //   return {} as ApiData
    // })

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
        return data
      })
    }

    const setApiData = (apiData:ApiData, value:ResponseValue) => {
      apiData.results = value.list
      apiData.total = value.total
    }

    const table = ref(null)
    const pagination = computed(() => {
      if(table.value && table.value['pagination']){
        return table.value['pagination'] as Pagination
      }
      return {} as Pagination
    })
    const onRequest = ref<OnRequest>()
    const selected = computed<Row[]>(() => {
      if(table.value && table.value['selected']){
        return table.value['selected']
      }
      return []
    })


    const addRowButtondisabled = ref(false)
    const addRowClick = () => {
      $q.dialog({
        component: AddRowDialog,
        componentProps: {
          rowKey: rowKey,
          units: units,
        }
      }).onOk((unitsRequest:Row) => {
        void (async () => {
          await goBaseAdminApi.post<Response>('api/v1/posts', unitsRequest).then((response) => {
            if(response.data.code === 200){
              $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: '新增成功'
              })
            }
          })
          if(onRequest.value){
            await onRequest.value({
              pagination: pagination.value,
              filter:undefined
            })
          }
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
          rowKey: rowKey,
          units: units,
          selected: selected.value
        }
      }).onOk((unitsRequests:Row[]) => {
          void (async () => {
            for(let unitsRequest of unitsRequests){
              await goBaseAdminApi.put<Response>(`api/v1/posts/${unitsRequest[rowKey]}`, unitsRequest).then((response) => {
                if(response.data.code === 200){
                  $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: '編輯成功'
                  })
                }
              })
            }
            if(onRequest.value){
              await onRequest.value({
                pagination: pagination.value,
                filter:undefined
              })
            }
          })()
      })
    }

    const removeRowButtonDisabled = computed(() => {
      return selected.value.length ? false : true
    })
    const removeRowClick = () => {
      $q.dialog({
        component: RemoveRowDialog,
        componentProps: {
          rowKey: rowKey,
          units: units,
          selected: selected.value
        }
      }).onOk((unitsRequests:Row[]) => {
          void (async () => {
            //because splice trigger reset index so use while
            let i = unitsRequests.length
            while (i--) {
              const unitsRequest = unitsRequests[i]
              await goBaseAdminApi.delete<Response>(`api/v1/posts/${unitsRequest[rowKey]}`).then(() => {
                  $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: '刪除成功'
                  })
                  const index = selected.value.findIndex(el => el.id === unitsRequest.id)
                  if (index > -1) {
                    selected.value.splice(index, 1);
                  }
              })
            }
            if(onRequest.value){
              await onRequest.value({
                pagination: pagination.value,
                filter:undefined
              })
            }
          })()
      })
    }

    onMounted(() => {
      onRequest.value = (() => {
        if(table.value && table.value['onRequest']) {
          return table.value['onRequest'] as OnRequest
        }
      })()
    })

    return {
        rowKey,
        columns,
        selected,
        units,
        addRowButtondisabled,
        addRowClick,
        editRowButtondisabled,
        editRowClick,
        removeRowButtonDisabled,
        removeRowClick,

        getApiData,
        setApiData,

        table
    }
  }
})
</script>
