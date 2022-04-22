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
import { defineComponent, ref, toRefs, reactive, onMounted } from 'vue'
import { Response } from 'src/components/api'
import { Pagination, OnRequest } from 'src/components/api-table'

export default defineComponent({
  props: {
    title: String,
    getApiData: Function,
    setApiData: Function,
    rowKey: String,
    columns: Array
  },
  setup(props) {
    const loading = ref(false)

    let pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 20,
      rowsNumber: 0
    } as Pagination)

    const filter = ref('')
    const apiData = reactive({
      results: [],
      total: 0
    })
    const selected = ref([])

    const { getApiData, setApiData } = toRefs(props)

    const pagesNumber = ref(0)

    const onRequest:OnRequest = async (onRequestProps):Promise<void> => {
      pagination.value = onRequestProps.pagination
      const { page, rowsPerPage, sortBy, descending } = pagination.value
      const filter = onRequestProps.filter

      loading.value = true

      // get all rows if "All" (0) is selected
      const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

      // fetch data from "server"
      if(getApiData.value){
        const { value } = await getApiData.value(page, fetchCount, filter, sortBy, descending) as Response
        if(setApiData.value) setApiData.value(apiData, value)
      }

      // update rowsCount with appropriate value
      pagination.value.rowsNumber = apiData.total
      pagesNumber.value =  Math.ceil(pagination.value.rowsNumber / rowsPerPage)

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

    const removeSelected = (index:number) => {
      delete selected.value[index]
    }

    onMounted(async () => {
      if(pagination.value){
        await onRequest({
          pagination: pagination.value,
          filter: undefined
        })
      }
    })

    return {
      apiData,
      loading,
      pagination,
      filter,
      pagesNumber,
      selected,

      onRequest,
      getSelectedLabel,
      removeSelected
    }
  },
})
</script>
