import {ResponseType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import { appActions } from '../app/appSlice'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError(data.messages[0]))
    } else {
        dispatch(appActions.setAppError('Some error occurred'))
    }
    dispatch(appActions.setAppStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appActions.setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(appActions.setAppStatus('failed'))
}
