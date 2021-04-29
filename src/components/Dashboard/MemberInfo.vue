<template>
    <div>
        <div class="d-flex justify-content-between">
            <h6 class="text-muted text-left link" @click="move('/edit-individual-member/'+member.id)"> <i class="text-success fa fa-user" aria-hidden="true"></i>
                <b class="pl-2 text-uppercase">{{member.lastName}},</b> <b>{{member.firstName}}</b>
            </h6>
                <h6 v-if="member.chineseLastName" class="link" @click="move('/edit-individual-member/'+member.id)">
                <i class="text-success fa fa-user" aria-hidden="true"></i> <b class="text-muted text-left">{{member.chineseLastName}} {{member.chineseFirstName}}</b>
            </h6>
            <h6 class="text-muted text-left link" @click="move('/edit-individual-member/'+member.id)"> <i class="text-success fa fa-address-book" aria-hidden="true"></i>
                <b class="pl-2">{{member.idCard}}</b>
            </h6>
        </div>
        <div class="d-md-flex d-lg-flex d-block">
            <div >
                <h6 class="text-muted"><i class="text-success fas fa-phone pr-2"></i>{{member.phone}}</h6> 
            </div>
            <div class=" ml-md-auto">
                <h6 class="text-muted">{{member.email}}</h6> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        member: {
            type: Object,
            default: null
        }
    }
}
</script>