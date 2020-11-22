<template>
    <div>
        <div class="mt-2 text-left text-primary">
            <h4 class="text-purple">Add Booking (New Member)</h4>
        </div>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Full Name</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="e.g Tai Chan Man" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Mobile Phone No</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="Mobile Phone no" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Lesson</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <select placeholder="e.g Tai Chan Man" class="form-control roundeds">
                    <option value="" selected disabled>-- select --</option>
                </select>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>ID Card no.</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="e.g DSHADH" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Existing License.</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <select placeholder="e.g Tai Chan Man" class="form-control roundeds">
                    <option value="" selected disabled>-- select --</option>
                </select>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>License Expiry Date License.</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input type="date" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Remarks.</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-textarea placeholder="Add remarks" rows="4" class="roundeds"></b-textarea>
            </b-col>
        </b-row>
        <div class="text-md-left">
            <b-button pill variant="danger" class="d-block pr62" size="lg">Add</b-button>
            <b-button pill variant="outline-secondary" @click="$emit('go-back',false)" class="d-block mt-md-2 mt-2 pr-5 pl-5" size="lg">Cancel</b-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.pr62{
    padding-right:62px !important;
    padding-left:62px !important;
}
</style>