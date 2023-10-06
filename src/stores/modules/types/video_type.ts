import type { RouteRecordRaw } from 'vue-router'
import type {videoInfo} from '@/api/ai/type'

type VideoState<T, K extends keyof T> = {
  [P in K]: T[P];
}