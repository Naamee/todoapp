<template>
    <v-navigation-drawer>
        <div class="d-flex align-center px-4">
            <v-avatar icon="mdi-account" color="teal-darken-4" rounded="0"></v-avatar>
            <v-list-item title="Naamee Akram" id="sd"></v-list-item>
        </div>
        <v-divider></v-divider>
        <v-list-item link to="/" title="Default Project"></v-list-item>
        <v-list-item to="another-project" title="Another Project"></v-list-item>
    </v-navigation-drawer>
</template>

<style scoped>
#sd  {
    margin: 10px;
}
</style>