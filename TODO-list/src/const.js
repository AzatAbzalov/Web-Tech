const Status = {
    BACKLOG: `backlog`,
    PROCESSING: `in-progress`,
    DONE: `completed`,
    BASKET: `trash-can`    
};

const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESSING]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.BASKET]: `Корзина`
}

export {Status, StatusLabel}