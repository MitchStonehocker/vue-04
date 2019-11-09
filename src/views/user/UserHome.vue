<template>
    <div>
        <h1>User Dashboard</h1>
    </div>
</template>

<script>
import UserDashboard from "../../layouts/UserDashboard"

export default {
    components: {

    },
    created() {
        this.$emit(`update:layout`, UserDashboard)
    }
    
}
</script>