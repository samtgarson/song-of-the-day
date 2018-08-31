import { ActivityIcon, LogOutIcon } from 'vue-feather-icons'
import Vue from 'vue'

const icons = [ActivityIcon, LogOutIcon]

icons.forEach(i => Vue.component(i.name, i))
