import  {FC} from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'



const PrivateRoute: FC <{component: FC, exact?: boolean, path:string | string[]}> = ({component: Component  , ...rest }) => {
    const user = localStorage.getItem("user")


    const renderPrivateComponent: FC<RouteComponentProps> = (props)=> {

        if(!user) {
            return (
                <Redirect to = "/"/>
            )
        }

        return (
            <Component {...props}/>
        )
    }
    return (
    <Route {...rest} render={renderPrivateComponent}/>
    )
}

export default PrivateRoute
