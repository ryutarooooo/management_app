document.addEventListener('turbolinks:load', () => {

    if (document.getElementById('start-calendar')) {
        // '2020-01-12'のような文字列から，Javascriptの日付オブジェクトを取得する関数
        // setHoursを使用しないと，時差の影響で0時にならないため注意！
        const convertDate = (date) => new Date(new Date(date).setHours(0, 0, 0, 0))

        const minDate = (date1, date2) => (date1 < date2) ? date1 : date2
        const maxDate = (date1, date2) => (date1 > date2) ? date1 : date2

        const START_DATE = convertDate(gon.graph_records[0].date)
        const END_DATE = convertDate(gon.graph_records[gon.graph_records.length - 1].date)

        flatpickr.localize(flatpickr.l10ns.ja)

        const drawGraphForPeriod = () => {
            let from = convertDate(document.getElementById('start-calendar').value)
            let to = convertDate(document.getElementById('end-calendar').value)

            if (from > to) {
                alert('終了日は開始日以降の日付に設定して下さい')
            } else {
                drawGraph(from, to)
            }
        }

        const periodCalendarOption = {

            disableMobile: true,
            minDate: START_DATE,
            maxDate: END_DATE,
            onChange: drawGraphForPeriod
        }

        const startCalendarFlatpickr = flatpickr('#start-calendar', periodCalendarOption)
        const endCalendarFlatpickr = flatpickr('#end-calendar', periodCalendarOption)

        flatpickr('#new-calendar', {
            disableMobile: true,
            // // 記録のある日付を選択できないようにする
            disable: gon.recorded_dates,
            defaultDate: 'today',
        })

        const TODAY = convertDate(new Date())
        const A_WEEK_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 6)
        const TWO_WEEKS_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 13)
        const A_MONTH_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, TODAY.getDate() + 1)
        const THREE_MONTHS_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 3, TODAY.getDate() + 1)


        const chartWeightContext = document.getElementById("chart-weight").getContext('2d')

        let chartWeight


        const drawGraph = (from, to) => {
            let records = gon.graph_records.filter((record) => {
                let date = convertDate(record.date)
                return from <= date && date <= to
            })


            let dates = records.map((record) => {
                return record.date.replace(/^\d+-0*(\d+)-0*(\d+)$/, '$1/$2')
            })


            let weights = records.map((record) => record.weight)


            let weightDatasets = {
                type: 'line',
                label: '体重(kg)',
                data: weights,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                spanGaps: true,
                fill: false,
                yAxisID: 'y-axis-weight'
            }

            let distances = records.map((record) => record.distance)

            let distanceDatasets = {
                type: 'bar',
                label: '距離(km)',
                data: distances,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                spanGaps: true,
                yAxisID: 'y-axis-distance',
            }

            let graphData = {
                labels: dates,
                datasets: [weightDatasets, distanceDatasets]
            }

            let options = {
                tooltips: {
                    callbacks: {
                        title: function (tooltipItems) {
                            return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
                        },
                        label: function (tooltipItem) {
                            return '体重: ' + tooltipItem.yLabel + 'kg'
                        }
                    }
                },
                scales: {
                    yAxes: [{
                            id: 'y-axis-weight', // Y軸のID
                            position: 'left', // どちら側に表示される軸か？
                            ticks: { // スケール
                                suggestedMax: 50,
                                suggestedMin: 70,
                            }
                        },
                        {
                            id: 'y-axis-distance',
                            position: 'right',
                            ticks: {
                                max: 10,
                                min: 0,
                            },
                            gridLines: {
                                display: false,
                            }
                        }
                    ]
                }
            }

            if (!chartWeight) {
                chartWeight = new Chart(chartWeightContext, {
                    type: 'bar',
                    data: graphData,
                    options: options
                })
            } else {
                chartWeight.data = graphData
                chartWeight.options = options
                chartWeight.update()
            }
        }

        const drawGraphToToday = (from) => {
            from = maxDate(from, START_DATE)
            let to = minDate(TODAY, END_DATE)
            drawGraph(from, to)
            startCalendarFlatpickr.setDate(from)
            endCalendarFlatpickr.setDate(to)
        }


        document.getElementById('a-week-button').addEventListener('click', () => {
            drawGraphToToday(A_WEEK_AGO)
        })

        document.getElementById('two-weeks-button').addEventListener('click', () => {
            drawGraphToToday(TWO_WEEKS_AGO)
        })

        document.getElementById('a-month-button').addEventListener('click', () => {
            drawGraphToToday(A_MONTH_AGO)
        })

        document.getElementById('three-months-button').addEventListener('click', () => {
            drawGraphToToday(THREE_MONTHS_AGO)
        })
        drawGraphToToday(A_WEEK_AGO)

        const editCalendar = document.getElementById('edit-calendar')
        const editWeight = document.getElementById('edit-weight')
        const editDistance = document.getElementById('edit-distance')
        const inputWeight = () => {
            let record = gon.graph_records.find((record) => record.date === editCalendar.value)
            editWeight.value = record.weight
            editDistance.value = record.distance
        }

        // 記録編集用のカレンダー
        flatpickr('#edit-calendar', {
            disableMobile: true,
            // 記録のある日付のみ選択できるようにする
            enable: gon.recorded_dates,
            // 記録が無い場合は日付を選択できないようにする
            noCalendar: gon.recorded_dates.length === 0,
            onChange: inputWeight
        })
    }
})