import  { FC } from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'

const PublicRoute: FC<{component: FC, exact: boolean, path: string | string[]}> = ({component: Component, ...rest}) => {
    const user = localStorage.getItem("user")

    const renderPublicRoute: FC<RouteComponentProps> = (props) => {

        if(user) {
            return(
                <Redirect to ="/app"/>
            )
        } else {
           return (
            <Component {...props} />
        ) 
        }
    }
    return (
     <Route {...rest} render = {renderPublicRoute}/>
    )
}

export default PublicRoute
