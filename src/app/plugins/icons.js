import {
  ActivityIcon,
  LogOutIcon,
  LogInIcon,
  MusicIcon,
  UsersIcon,
  HomeIcon,
  MenuIcon,
  ArrowRightCircleIcon,
  SlackIcon
} from 'vue-feather-icons'
import Vue from 'vue'

const icons = [
  ActivityIcon,
  LogOutIcon,
  LogInIcon,
  UsersIcon,
  MusicIcon,
  HomeIcon,
  MenuIcon,
  ArrowRightCircleIcon,
  SlackIcon
]

icons.forEach(i => Vue.component(i.name, i))
