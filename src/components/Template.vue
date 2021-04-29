<template>
    <div class="attendance-template">
        <h4 class="course-name">
            <strong>Competent Person &amp; Certified Workers of Confined Spaces Operation Training Course</strong>
        </h4>
        <h5>
            <strong>Attendance Sheet 出席表</strong>
        </h5>
        <div class="course-time">
            <div class="code"><strong>Course Code: CSCP0001</strong></div>
            <div class="time"><strong>Time: 9 : 00  - 18 : 00</strong></div>
        </div>
        <div class="clearfix"></div>
        <div class="lecturer">
            <div class="lecturer-name"><strong>Lecturer:  Chong Heung Yiu</strong></div>
            <div class="date"><strong>Date: 15 August 2020</strong></div>
        </div>
        <div class="clearfix"></div>

        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Company</th>
                    <th>Name</th>
                    <th>中文姓名</th>
                    <th>Position 職位</th>
                    <th>Signature 簽署 上午 am</th>
                    <th>Signature 簽署 上午 pm</th>
                    <th>Fee</th>
                    <th>HKID Card No</th>
                    <th>Date of Birth</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Company</td>
                    <td>TAI MAN CHAN</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.attendance-template {
    width: 100%;
}

.course-name {
    margin-top: 30px;
}

.course-time, .lecturer {
    margin-top: 20px;
    /* display: flex;
    flex-direction: row;
    justify-content: space-between; */
}

.course-time .code {
    float: left;
}

.course-time .time {
    float: right;
}

.clearfix {
    clear: both;
}

.lecturer .lecturer-name {
    float: left;
}

.lecturer .date {
    float: right;
}

.code, .time, .lecturer-name, .date {
    text-align: left;
    min-width: 250px;
    border-bottom: 2px solid black;
}
table {
    width: 100%;
    margin-top:30px;
}
table th, table td {
    border: 1px solid black;
    padding: 2px 5px;
}
</style>