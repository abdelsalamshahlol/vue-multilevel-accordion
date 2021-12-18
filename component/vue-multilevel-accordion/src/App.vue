<template>
    <div dir="rtl">
        <multilevel-accordion :tree="tree" :margin-right="5" rtl>
            <template slot-scope="{ tree }">
                <div>
                    <p>{{ tree.text }}</p>
                </div>
            </template>
            <template slot="loader">
                Please wait.....
            </template>
        </multilevel-accordion>
    </div>
</template>

<script>
    import MultilevelAccordion from "./MultilevelAccordion";
    import Vue from 'vue'
    export default {
        name: "App",
        components: {
            MultilevelAccordion,
        },
        methods: {
            ch() {
                //append
                setTimeout(()=>{
                    Vue.set(this.tree.children[0],'children',[
                        {
                            "id": 2,
                            "text": "هواتف ذكية",
                            xx:'sss'
                            // expended: true
                        }
                    ] )
                    Vue.set(this.tree.children, 'sss', true)
                }, 320)
                // this.tree.children[0].push(
                // )
            }
        },
        data() {
            return {
                tree: {
                    "text": "Root",
                    xx:'sss'
,
                    "children": [
                        {
                            xx:'sss'
,
                            "id": 1,
                            "ar_name": "أجهزة محمولة",
                            "text": "أجهزة محمولة",
                            "expanded": true,
                            "children": [],
                            clickHandler: (obj)=> new Promise((resolve)=> {
                                setTimeout(()=> {
                                    console.log('doing something....', {obj})
                                    Vue.set(this.tree.children[0],'children',[
                                        {
                                            "id": 2,
                                            "text": "هواتف ذكية",
                                            xx:'sss'
                                            // expended: true
                                        }
                                    ] )
                                    Vue.set(this.tree.children, 'sss', true)
                                    resolve('T')
                                },3000)
                            })
                        }
                    ]
                },
                tree2: {
                    text: "Root",
                    children: [
                        {
                            text: "الحاسب الآلي",
                            children: [
                                {
                                    text: "حاسوب محمول",
                                    children: [
                                        {
                                            text: "مخصص للألعاب"
                                        },
                                        {
                                            text: "2 في 1"
                                        }
                                    ]
                                },
                                {
                                    text: "المكتبي",
                                    children: [
                                        {
                                            text: "Alienware"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>