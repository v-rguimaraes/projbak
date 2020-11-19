

const themeColors = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']

export default {

  totalPago: "123.345.678,90",
  columnChart: {
    series: [
      {
        name: 'Pagamentos',
        data: [1000000000.12, 1020000000.12, 1000600000.12, 1000000700.12, 1200000000.12, 1000080000.12, 1020000000.12, 1000000900.12, 1050000000.12]
      }
    ],
    chartOptions: {
      colors: themeColors,
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '55%'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },

      xaxis: {
        categories: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
      },
      yaxis: {
        title: {
          text: 'R$ (milhares)'
        }
      },
      fill: {
        opacity: 1

      },
      tooltip: {
        y: {
          formatter (val) {
            return `R$ ${val} milhares`
          }
        }
      }
    }
  }
}
