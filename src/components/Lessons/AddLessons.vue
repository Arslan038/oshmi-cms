<template>
    <div>
        <b-row>
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Select Lessons</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <select placeholder="e.g Tai Chan Man" class="form-control roundeds">
                    <option value="" selected disabled>-- select --</option>
                </select>
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
            <b-button pill variant="danger" @click="$emit('add-lesson',true)" class="d-block pr62" size="lg">Add</b-button>
            <b-button pill variant="outline-secondary" class="d-block mt-md-2 mt-2 pr-5 pl-5" size="lg">Cancel</b-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>