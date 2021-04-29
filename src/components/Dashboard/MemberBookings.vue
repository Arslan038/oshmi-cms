<template>
    <div>
        <div class="text-left">
            <h6><strong>Booking Records</strong></h6>
            <hr>
        </div>
        <div v-if="!member.Bookings.length || !getPendingBookings" class="text-center">
            <strong>No Pending Booking Found.</strong>
        </div>
        <div v-for="(item, index) in member.Bookings" :key="index">
            <div v-if="item.status === 'pending'">
                <div class="d-md-flex d-lg-flex d-block mt-2">
                    <div>
                        <p class="text-left"> <b>{{item.Lesson.Course.name}}</b> </p>
                        <p class="text-left">{{item.Lesson.name}} </p>
                    </div>
                    <div class="ml-auto">
                        <h6 class="text-left">{{getDate(item.createdAt)}}</h6>
                    </div>
                </div>
                
                <div class="text-right">
                    <b-button variant="danger" size="sm">Receipt</b-button>
                    <b-button variant="outline-warning" class="ml-1" size="sm" @click="bookingMethod(item)">Payment</b-button>
                </div>
                <hr>
            </div>
        </div>

        <!-- Update Payment Method -->

        <b-modal title="Payment Method" v-model="paymentMethodModal" hide-footer>
            <b-form @submit.prevent="updatePaymentMethod">
                <b-row>
                    <b-col cols="12">
                    <b-form-group>
                        <b-form-radio-group stacked v-model="selectedPaymentMethod" required>
                            <b-form-radio value="cash" button-variant="danger">Cash</b-form-radio>
                            <b-form-radio value="credit card" button-variant="success">Credit Card</b-form-radio>
                            <b-form-radio value="octopus">Octopus</b-form-radio>
                            <b-form-radio value="other">Other</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>
                    <b-form-group v-if="selectedPaymentMethod === 'other'">
                        <b-form-input v-model="otherPayment" class="roundeds" placeholder="Enter Payment Method" required></b-form-input>
                    </b-form-group>
                    </b-col>
                    <b-col cols="12" class="mt-3">
                        <b-button variant="danger" type="submit" class="roundeds" block :disabled="updateLoading">{{updateLoading ? 'Updating Payment Method...' : 'Submit'}}</b-button>
                        <b-button variant="outline-danger" class="mt-2 roundeds" block @click="paymentMethodModal = !paymentMethodModal">Cancel</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props: {
        member: {
            type: Object,
            default: null
        }
    },
    computed: {
        getPendingBookings() {
            if(this.member && this.member.Bookings.length) {
                const bookings = this.member.Bookings.filter(booking => booking.status === 'pending')
                if(bookings.length) {
                    return true
                }
            }
            return false
        },
    },
    data() {
        return {
            paymentMethodModal: false,
            selectedPaymentMethod: null,
            otherPayment: null,
            selectedBooking: null,
            updateLoading: false
        }
    },
    methods: {
        ...mapActions(["updateBookingPaymentMethod"]),
        bookingMethod(booking) {
            this.selectedBooking = Object.assign({}, booking)
            this.selectedPaymentMethod = booking.paymentMethod
            if(this.selectedPaymentMethod != 'cash' && this.selectedPaymentMethod != 'credit card' && this.selectedPaymentMethod != 'octopus') {
                this.selectedPaymentMethod = 'other'
                this.otherPayment = booking.paymentMethod
            }
            this.paymentMethodModal = true
        },
        async updatePaymentMethod() {
            const data = {
                id: this.selectedBooking.id,
                paymentMethod: this.selectedPaymentMethod === 'other' ? this.otherPayment : this.selectedPaymentMethod
            }

            this.updateLoading = true
            const resp = await this.updateBookingPaymentMethod(data)
            this.updateLoading = false

            if(resp === 1) {
                this.paymentMethodModal = false
                this.$emit('updateMemberBooking', data)
            }
        }
    }
}
</script>