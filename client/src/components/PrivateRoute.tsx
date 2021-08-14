import  {FC} from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'



const PrivateRoute: FC <{component: FC}> = ({component: Component  , ...rest }) => {
    const renderPrivateComponent: FC<RouteComponentProps> = (props)=> {


        return (
            <Component {...props}/>
        )
    }
    return (
    <Route {...rest} render={renderPrivateComponent}/>
    )
}

export default PrivateRoute
