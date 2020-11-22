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
            <div>
                <b-table :responsive="true" :fields="corporate_head" :items="corporate_data">
                    <template v-slot:head(action)="data">
                        <b-checkbox></b-checkbox>
                    </template>
                    <template v-slot:head(company_name)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>
                    <template v-slot:head(contact_email)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>
                    <template v-slot:head(contact_number)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <template v-slot:head(license_expiry_date)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <template v-slot:head(email)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <!-- Cells -->
                    <template v-slot:cell(action)="data">
                        <span class="smalls">{{data.item.member_id}} </span>
                    </template>
                    <template v-slot:cell(company_name)="data">
                        <span class="smalls">{{data.item.company_name}}</span>
                    </template>
                    <template v-slot:cell(contact_email)="data">
                        <span class="smalls">{{data.item.contact_email}}</span>
                    </template>
                    <template v-slot:cell(contact_number)="data">
                        <span class="smalls">{{data.item.contact_number}}</span>
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
                corporate_head: [
                        // A regular column
                    'action',
                    'company_name',
                    'contact_email',
                    'contact_number',

                ],
                corporate_data:[
                    {
                    action:'',
                    company_name:'Gammon',
                    contact_email:'gammon@gmail.com',
                    contact_number:'73546558',

                    }
                ]
     }
 }
}
</script>

<style>

</style>