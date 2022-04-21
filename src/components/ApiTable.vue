<template>
  <q-table
    :title="title"
    :rows="apiData.results"
    :columns="columns"
    :row-key="rowKey"
    :selected-rows-label="getSelectedLabel"
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, reactive, computed } from 'vue'
import { Response, ResponseValue } from 'src/components/api'
import { OnRequestProps } from 'src/components/api-table'

export default defineComponent({
  props: {
    title: String,
    getApiData: Function,
    rowKey: String,
    columns: Array
  },
  setup(props) {
    const loading = ref(false)
    const filter = ref('')
    const apiData = reactive({
      results: [],
      page: {
        page_num: 1,
        page_size: 5
      },
      total: 0
    })
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 0
    })
    const selected = ref([])

    const { getApiData } = toRefs(props)
    const setApiData = (value:ResponseValue) => {
      apiData.results = value.list
      apiData.total = value.total
    }

    const getRowsNumberCount = () => {
      return apiData.total
    }

    const onRequest = async (onRequestProps:OnRequestProps):Promise<void> => {
      const { page, rowsPerPage, sortBy, descending } = onRequestProps.pagination
      const filter = onRequestProps.filter

      loading.value = true

      // get all rows if "All" (0) is selected
      const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

      // fetch data from "server"
      if(getApiData.value){
        const { value } = await getApiData.value(page, fetchCount, filter, sortBy, descending) as Response
        setApiData(value)
      }

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

    const getSelectedLabel = () => {
      return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${apiData.results.length}`
    }

    const pagesNumber = computed(() => {
      return Math.ceil(apiData.total / pagination.value.rowsPerPage)
    })

    onMounted(async () => {
      await onRequest({
        pagination: pagination.value,
        filter: undefined
      })
    })

    return {
      apiData,
      loading,
      filter,
      pagination,
      pagesNumber,
      selected,

      onRequest,
      getSelectedLabel,
    }
  },
})
</script>
