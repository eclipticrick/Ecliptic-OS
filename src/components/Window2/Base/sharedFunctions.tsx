import {DraggableData} from 'react-draggable';

export const disableDragging = (self: any) => {
    self.setState({
        disableDragging: true
    });
};
export const enableDragging = (self: any) => {
    self.setState({
        disableDragging: false
    });
};
export const handleDraggingStop = (e: MouseEvent, data: DraggableData, self: any) => {
    self.setState({
        position: {
            x: data.lastX,
            y: data.lastY
        }
    });
};
