<template>
  <div id="ag-grid-demo">

    <vx-card>
      <!-- TABLE ACTION ROW -->
      <div class="flex flex-wrap justify-between items-center">

        <!-- ITEMS PER PAGE -->
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ linhas.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : linhas.length }} of {{ linhas.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                <span>50</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                <span>100</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                <span>150</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
          <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Exportar como CSV</vs-button>
        </div>
      </div>
      <ag-grid-vue
        ref="agGridTable"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="linhas"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>
      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="currentPage" />

    </vx-card>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import Api from '@/service/api'
import vSelect from 'vue-select'

import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'


export default {
  components: {
	AgGridVue,
	vSelect,
  },
  data () {
    return {
      searchQuery: '',
      gridOptions: {},
      maxPageNumbers: 7,
      gridApi: null,
      defaultColDef: {
        sortable: true,
        editable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
	    	{
          headerName: 'Linha',
          field: 'Linha',
          filter: true,
          width: 250,
          pinned: 'left'
        },
        {
          headerName: 'Operadora',
          field: 'Operadora',
          width: 150,
          filter: true
        },
        {
          headerName: 'Fantasia',
          field: 'Fantasia',
          filter: true,
          width: 450
        },
        {
          headerName: 'Situação',
          field: 'Situacao',
          filter: true,
          width: 150
        },
        {
          headerName: 'Tarifa',
          field: 'Tarifa',
          filter: true,
          width: 150
        }
      ],
	    linhas : [],
    }
    

  },
  watch: {
    '$store.state.windowWidth' (val) {
      if (val <= 576) {
        this.maxPageNumbers = 4
        this.gridOptions.columnApi.setColumnPinned('email', null)
      } else this.gridOptions.columnApi.setColumnPinned('email', 'left')
    }
  },
  computed: {
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 50
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  methods: {

  },
  mounted () {
	this.gridApi = this.gridOptions.api
	Api().post('https://rockappfunc.azurewebsites.net/api/func-get-data-linhas?code=gEi5tqfbBx7XjrEZBovbR2NvRoca08ZoJEeMcQWLxRTw6bKaYljoVQ==').then((response)=>{
    console.log(response)
	  this.linhas = response.data.items
    })

  }
}

</script>
