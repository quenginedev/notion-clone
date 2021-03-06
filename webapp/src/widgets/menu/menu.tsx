// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react'

import SeparatorOption from './separatorOption'
import SwitchOption from './switchOption'
import TextOption from './textOption'
import ColorOption from './colorOption'
import SubMenuOption from './subMenuOption'
import LabelOption from './labelOption'

import './menu.scss'
import textInputOption from './textInputOption'

type Props = {
    children: React.ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
}

export default class Menu extends React.PureComponent<Props> {
    static Color = ColorOption
    static SubMenu = SubMenuOption
    static Switch = SwitchOption
    static Separator = SeparatorOption
    static Text = TextOption
    static TextInput = textInputOption
    static Label = LabelOption

    public state = {
        hoveringIdx: -1,
    }

    public render(): JSX.Element {
        const {position, children} = this.props
        return (
            <div className={'Menu noselect ' + (position || 'bottom')}>
                <div className='menu-contents'>
                    <div className='menu-options'>
                        {React.Children.map(children, (child, i) => {
                            return addChildMenuItem({
                                child,
                                onMouseEnter: () =>
                                    this.setState({
                                        hoveringIdx: i,
                                    }),
                                isHovering: () => i === this.state.hoveringIdx,
                            })
                        })}
                    </div>

                    <div className='menu-spacer hideOnWidescreen'/>

                    <div className='menu-options hideOnWidescreen'>
                        <Menu.Text
                            id='menu-cancel'
                            name={'Cancel'}
                            className='menu-cancel'
                            onClick={this.onCancel}
                        />
                    </div>
                </div>
            </div>
        )
    }

    private onCancel = () => {
        // No need to do anything, as click bubbled up to MenuWrapper, which closes
    }
}

function addChildMenuItem(props: {child: React.ReactNode, onMouseEnter: () => void, isHovering: () => boolean}): JSX.Element | null {
    const {child, onMouseEnter, isHovering} = props
    if (child !== null) {
        if (React.isValidElement(child)) {
            const castedChild = child as React.ReactElement

            return (
                <div
                    onMouseEnter={onMouseEnter}
                >
                    {castedChild.type === SubMenuOption ? (
                        <castedChild.type
                            {...castedChild.props}
                            isHovering={isHovering}
                        />
                    ) : (
                        <castedChild.type {...castedChild.props}/>
                    )}
                </div>
            )
        }
    }
    return (null)
}
