const ORDER_STATUS = {
    ordered: 'Ordered',
    rejected: 'Rejected',
    accepted: 'Accepted',
    onTheWay: 'On the way',
    completed: 'Completed'
}

export const orderStatusTextToIndex = orderStatus => {
    switch (orderStatus) {
        case ORDER_STATUS.rejected:
            return 0;
        case ORDER_STATUS.ordered:
            return 1;
        case ORDER_STATUS.accepted:
            return 2;
        case ORDER_STATUS.onTheWay:
            return 3;
        case ORDER_STATUS.completed:
            return 4;
        default:
            return 0;
    }
} 