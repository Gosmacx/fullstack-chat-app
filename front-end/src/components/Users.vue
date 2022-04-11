<template>
        <div class="lg:w-28 lg:h-[700px] w-[95%] h-20 relative lg:flex-col flex-row lg:overflow-y-auto overflow-x-auto p-2 flex justify-start items-center lg:space-y-2 space-y-0 space-x-2 lg:space-x-0  bg-gray-300 rounded shadow-lg shadow-gray-800" >
            <div v-for="user in $store.getters.getUsers" :key="user" class="bg-gray-400 text-blue-600 transition-all hover:bg-gray-500 hover:text-gray-900 rounded-lg flex items-center justify-center lg:w-full w-20 h-12"    >
                <span :class="{ selfName: user.id == $store.state.id }" class="flex items-center justify-center line-clamp-1" > 
                    {{ user.username }} 
                </span>
            </div>
        </div>
</template>

<style>
.selfName{
    font-weight: 700;
}
</style>