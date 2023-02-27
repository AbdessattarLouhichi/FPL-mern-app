const navs = [
    {
        name:'Books',
        children:[{
            to: '/admin/books',
            name:'List book'
        },
        {
            to: '/admin/addBook',
            name:'Add Book'
        },
        {
            to: '/admin/books/id',
            name:'Update Book'
        }]
    },
    {
        name:'Categories',
        children:[{
            to: '/admin/categories',
            name:'Category List'
        },
        {
            to: '/admin/addCategory',
            name:'Add category'
        },]
    },
    {
        name: 'Users',
        children: [{
            to: '/admin/users',
            name: 'List users'
        }]
    }
    

]
export default navs