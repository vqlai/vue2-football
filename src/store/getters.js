// getters.js 对状态state进行映射和过滤处理,在store注册后就可以在组件通过mapGetters获取到所有状态

export const id = state => state.id

export const name = state => state.name

export const sex = state => state.sex

export const mode = state => state.mode

export const info = state => state.info

