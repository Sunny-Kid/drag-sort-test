import CardItem from './CardItem'
import HTML5Backend from 'react-dnd-html5-backend'
import React from 'react';
import { DndProvider } from 'react-dnd'
import './CardTable.less';
import { CARD_WIDTH, CARD_HEIGHT, COLUMN } from './consts'

class CardTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardList: [],
      newRender: false,
    }
  }

  // 初始化数据
  componentDidMount = () => {
    let cardList = []
    for(let i = 0; i < 32; i++) {
      cardList.push(i)
    }
    this.setState({
      cardList,
    })
  }

  // 卡片重新排序
  moveSort = (dragIndex, hoverIndex) => {
    const cardList = this.state.cardList.slice();
    const tmp = cardList[dragIndex]
    cardList.splice(dragIndex, 1)
    cardList.splice(hoverIndex, 0, tmp)
    this.setState({
      cardList,
    })
    this.forceUpdate();
  }

  getPreviewerPosition(index) {
    const x = Math.floor(index % COLUMN) * (CARD_WIDTH +  24);
    const y = Math.floor(index / COLUMN) * (CARD_HEIGHT +  24);
    return {
      left: x,
      top: y,
    };
  };

  // 卡片重新render
  newRenderFn = () => {
    this.setState({
      newRender: !this.state.newRender,
    })
  }

  render() {
    const { cardList } = this.state;
    return (
      // 使用dndprovider包裹可被拖拽的卡片
      <DndProvider backend={HTML5Backend}>
        <div className="CardTable">
          {
            cardList.map((value, index) => {
              return <CardItem 
                key={value}
                index={index}
                top={this.getPreviewerPosition(index).top}
                left={this.getPreviewerPosition(index).left}
                value={value}
                newRender={this.state.newRender}
                moveSort={this.moveSort}
                newRenderFn={this.newRenderFn}
              />
            })
          }
        </div>
      </DndProvider>
    );
  }
}

export default CardTable;
