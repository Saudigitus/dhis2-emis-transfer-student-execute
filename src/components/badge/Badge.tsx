import React from 'react'
import style from "./Badge.module.css"
import { BadgeProps } from '../../types/sideBar/SideBarTypes'

export default function Badge({ value }: BadgeProps): React.ReactElement {
    return (
        <span className={style.BadgeContainer}>{value}</span>
    )
}
