import {lazy} from "react"
import UsersList from "./components/Pages/User/UsersList"
const Home = lazy(() => import('./components/Home'))
const AddBook = lazy(()=> import('./components/Pages/Book/AddBook'))
const UpdateBook = lazy(() => import('./components/Pages/Book/UpdateBook'))
const ListBook = lazy(()=> import('./components/Pages/Book/ListBook'))
const ListCategory = lazy(()=> import('./components/Pages/Category/ListCategory'))
const AddCategory = lazy(()=> import('./components/Pages/Category/AddCategory'))
export const routes = [
    
    {
        path: '/admin/addBook',
        element: AddBook,
        name:'add-Book',
        exact: true
    },
    {
        path: '/admin/books',
        element: ListBook,
        name:'Books',
        exact: true
    },
    {
        path: '/admin/books/:id',
        element: UpdateBook,
        name:'UpdateBook',
        exact: true
    },
    {
        path: '/admin/addCategory',
        element: AddCategory,
        name:'addCategory',
        exact: true
    },
    {
        path: '/admin/categories',
        element: ListCategory,
        name:'Categories',
        exact: true
    },
    {
        path: '/admin/users',
        element: UsersList,
        name: 'Users',
        exact: true
    }

]

export const clientRoutes = [
    {
        path: '/books',
        element: ListBook,
        name:'Books',
        exact: true
    },
    {
        path: '/',
        element: Home,
        name:'Home',
        exact: true
    }
]
