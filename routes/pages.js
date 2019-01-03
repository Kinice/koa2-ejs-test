// models
const School = require('../models/school')

module.exports = (router) => {
  router.get('/', async (ctx, next) => {
    // ctx.body = 'Hello World'
    ctx.state = {
      title: 'Koa2'
    }
    await ctx.render('index', ctx.state)
  })

  router.get('/course-system', async (ctx, next) => {
    // ctx.body = 'Hello World'
    ctx.state = {
      title: '课程体系'
    }
    await ctx.render('course-system', ctx.state)
  })

  router.get('/course-feature', async (ctx, next) => {
    // ctx.body = 'Hello World'
    ctx.state = {
      title: '课程特色'
    }
    await ctx.render('course-feature', ctx.state)
  })

  router.get('/brand-story', async (ctx, next) => {
    // ctx.body = 'Hello World'
    ctx.state = {
      title: '品牌故事'
    }
    await ctx.render('brand-story', ctx.state)
  })

  router.get('/campus', async (ctx, next) => {
    // ctx.body = 'Hello World'
    ctx.state = {
      title: '校区分布'
    }
    await ctx.render('campus', ctx.state)
  })

  router.get('/adult-course', async (ctx, next) => {
    let school = new School()
    try {
      let result = await school.getClassifiedSchools()
      ctx.state = {
        schools: result,
        areas: Object.keys(result)
      }
    } catch (err) {
      console.error(err)
      ctx.throw(500)
    }
    await ctx.render('adult-course', ctx.state)
  })
}
