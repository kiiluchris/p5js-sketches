'use strict';

import Piece from './piece';

import {_find2DArrayNeighbours, _loop2DArray, _neighbourPosition} from '../shared';

export default class Pawn extends Piece {
    constructor(...args){
        super(...args);
        this.hasMoved = false;
    }

    getMoves(grid){
        this.moves = [];
        this.neighbours = _find2DArrayNeighbours(this.indexes.col, this.indexes.row, grid);
        if(this.side < 0)
            this.getMovesByPos("TOP");
        else
            this.getMovesByPos("BOT");
        return this.moves;
    }

    getMovesByPos(pos){
        console.log(this.neighbours)
        let left = this.neighbours[_neighbourPosition[pos + "_LEFT"].index];
        let right = this.neighbours[_neighbourPosition[pos + "_RIGHT"].index];
        let mid = this.neighbours[_neighbourPosition[pos].index];
        let val = _neighbourPosition[pos].gridIndex(this.indexes.col, this.indexes.row, this.w);
        
        if(!mid){
            this.moves.push(val);

            if(!this.hasMoved){
                let off = this.side > 0 ? val.row + 1 : val.row - 1;
                this.moves.push(Object.assign({}, val, { 
                    x: this.w * val.col,
                    y: this.w * off,
                    row: off
                }));  
            }
        }
        
        if(left && left.side + this.side === 0){
            this.moves.push(_neighbourPosition[pos + "_LEFT"].gridIndex(this.indexes.col, this.indexes.row, this.w));
        }
        if(right && right.side + this.side === 0){
            this.moves.push(_neighbourPosition[pos + "_RIGHT"].gridIndex(this.indexes.col, this.indexes.row, this.w));
        }
    }


    move(grid, point){
        this.hasMoved = true;
        grid[point.col][point.row] = grid[this.indexes.col].splice(this.indexes.row, 1, undefined)[0];
        grid[point.col][point.row].redraw(point);
        console.log(grid)
        return grid;
    }
}