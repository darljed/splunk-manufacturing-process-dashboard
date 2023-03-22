require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    "splunkjs/mvc/tableview",
    'splunkjs/mvc/simplexml/ready!'
  ], function(_, $, mvc, TableView) {
    console.log("JS Is Loaded")
    const search = mvc.Components.getInstance("table1_search")
    const data = [
        {
            "title":"Capture Customer Demand",
            "infra":"set1",
            'sub-process':
                {
                    "title":"Sales Order Creation",
                    "panels":[
                        {
                            "title":"Planned Delivery",
                            "value":395,
                            "color":"green"
                        },
                        {
                            "title":"Actual Delivery",
                            "value":377,
                            "color":"amber"
                        }
                    ]
                }
            
        },
        {
            "title":"Production Planning",
            "infra":"set2",
            'sub-process':
                {
                    "title":"Capacity Planning",
                    "panels":[
                        {
                            "title":"Overproduction",
                            "value":29,
                            "color":"green"
                        },
                        {
                            "title":"Underproduction",
                            "value":2,
                            "color":"green"
                        }
                    ]
                }
            
        },
        {
            "title":"Procure Materials / Harvest",
            "infra":"set1",
            'sub-process':
                {
                    "title":"Capacity Planning",
                    "panels":[
                        {
                            "title":"Supply Cycle Time",
                            "value":"2 Days",
                            "color":"green"
                        },
                        {
                            "title":"Overdue PO",
                            "value":37,
                            "color":"green"
                        },
                        {
                            "title":"PO Rejections",
                            "value":"2%",
                            "color":"green"
                        },
                        {
                            "title":"Ordered Items",
                            "value":"9,554",
                            "color":"green"
                        },
                        {
                            "title":"Delivered Items",
                            "value":"9,442",
                            "color":"green"
                        }
                    ]
                }
            
        },
        {
            "title":"Production",
            "infra":"set2",
            'sub-process':
                {
                    "title":"Supply and Demand",
                    "panels":[
                        {
                            "title":"Supply/Demand",
                            "value":"99/100",
                            "color":"green"
                        }
                    ]
                }
            
        },
        {
            "title":"Capture Cost",
            "infra":"set1",
            'sub-process':
                {
                    "title":"Supply chain cost per unit sold",
                    "panels":[
                        {
                            "title":"Cost Increase",
                            "value":"2%",
                            "color":"green"
                        }
                    ]
                }
            
        },
        {
            "title":"Quality Control",
            "infra":"set2",
            'sub-process':
                {
                    "title":"",
                    "panels":[
                        {
                            "title":"Rejected Products",
                            "value":"9.2%",
                            "color":"red"
                        }
                    ]
                }
            
        },
        {
            "title":"Warehouse Distribution",
            "infra":"set1",
            'sub-process':
                {
                    "title":"",
                    "panels":[
                        {
                            "title":"Delivered",
                            "value":"89%",
                            "color":"green"
                        },
                        {
                            "title":"Delayed",
                            "value":"3.7%",
                            "color":"green"
                        }
                    ]
                }
            
        },
    ]


    $(document).ready(function(){
        // handlers 
        $(".sidebar-overlay,.sidebar-collapse").on('click',function(){
            $(".sidebar-drilldown").fadeOut(300,function(){
                $("#sidecontent2").hide()
            })
            
        })
        $(".pc-item-mark").on('click',function(){
            $(".sidebar-drilldown").fadeIn(300)
            $("#sidecontent2").hide()
            let item_idx=parseInt($(this).data('item'))
            fillSidebar(item_idx)

            //change colors upon selection
            $(".pc-item-title h3.active").removeClass("active")
            $(this).children(".pc-item-title").children("h3").addClass("active")
        })
        $(document).on("click",".sc-item-metrics",function(){
            $("#sidecontent2").hide()
            $("#sidecontent2").slideDown(300)
            search.startSearch()
            
            const title = $(this).data('title')
            $("#sub_process_selected").text(title)

            // highlight on active
            $(".sc-item-metrics.active").removeClass("active")
            $(this).addClass("active")
        })

        // Splunk Components 
        CreateTable()
    })

    function CreateTable(){
        // Instantiate components
        new TableView({
            id: "table1",
            managerid: "table1_search",
            pageSize: "5",
            el: $("#table_content")
        }).render();
    }

    function fillSidebar(index){
        const title = data[index].title
        const infra = data[index].infra
        infraHandler(infra)

        // KPI Sub Process 
        let kpi_title = data[index]["sub-process"].title
        if(kpi_title != ""){
            kpi_title = ": "+kpi_title
        }
        $("#sidecontent1 .content-header").html(`${title} <span style='color: #fff'>${kpi_title}</span>`)

        const subArr = data[index]["sub-process"]["panels"]
        $("#sidecontent1 .sc-item").html("")
        subArr.forEach(element => {
            $("#sidecontent1 .sc-item").append(`
            <div data-title="${element.title}" class="sc-item-metrics ${element.color}">
                <p>${element.title}</p>
                <h2>${element.value}</h2>
            </div>`)
        });
    }

    function infraHandler(set){
        if(set == "set1"){
            $(".infra-set2").fadeOut(300,function(){

                $(".infra-set1").show()
            })
        }
        else{
            $(".infra-set1").fadeOut(300,function(){
                $(".infra-set2").show()
            })
            
        }
    }
  })