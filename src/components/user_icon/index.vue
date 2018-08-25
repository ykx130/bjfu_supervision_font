<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      欢迎 {{ this.currentUser.username }}
      <Avatar icon="ios-person"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  import {logoutUser} from '../../service/api/user'
  export default {
    name: 'User',
    props: {
      currentUser: Object
    },
    methods: {
      handleClick (name) {
        switch (name) {
          case 'logout':
            logoutUser().then(()=>{
              this.$router.push({path:'/'})
            })
            break
        }
      }
    }
  }
</script>
