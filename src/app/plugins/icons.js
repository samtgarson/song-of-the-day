import {
  ActivityIcon,
  LogOutIcon,
  UsersIcon
} from 'vue-feather-icons'
import Vue from 'vue'

const icons = [ActivityIcon, LogOutIcon, UsersIcon]

icons.forEach(i => Vue.component(i.name, i))
