<template>
    <div>
        <div class="mt-2 text-md-left d-flex">
            <div class="self-center">
                Search
            </div>
            <div class="ml-3">
                <input class="border-hids form-control col-md-12" />
            </div>
        </div>

        <div>
            <div class="mt-3">
                <b-table bordered :responsive="true" :fields="student_head" :items="student_data">
                    <template v-slot:head(member_id)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>
                    <template v-slot:head(last_name)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>
                    <template v-slot:head(first_name)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>
                    <template v-slot:head(phone_no)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <template v-slot:head(license_expiry_date)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <template v-slot:head(email)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <!-- Cells -->
                    <template v-slot:cell(member_id)="data">
                        <span class="smalls">{{data.item.member_id}} </span>
                    </template>
                    <template v-slot:cell(last_name)="data">
                        <span class="smalls">{{data.item.last_name}}</span>
                    </template>
                    <template v-slot:cell(first_name)="data">
                        <span class="smalls">{{data.item.first_name}}</span>
                    </template>
                    <template v-slot:cell(phone_no)="data">
                        <span class="smalls">{{data.item.phone_no}}</span>
                    </template>
                    <template v-slot:cell(license_expiry_date)="data">
                        <span class="smalls">{{data.item.license_expiry_date}} </span>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
 data(){
     return {
                student_head: [
                        // A regular column
                    'member_id',
                    'last_name',
                    'first_name',
                    'phone_no',
                    'license_expiry_date',
                    'email'     

                ],
                student_data:[
                    {
                    member_id:'43214',
                    last_name:'Chan',
                    first_name:'Jan',
                    phone_no:'735465',
                    license_expiry_date:'10-6-2021',
                    email:'demo@gmail.com' 

                    }
                ]
     }
 }
}
</script>

<style>

</style>