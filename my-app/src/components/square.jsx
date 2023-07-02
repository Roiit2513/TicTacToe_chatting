import React from "react";

function Square({ val, chooseSquare }) {

    return (
        <div onClick={chooseSquare} className="square">
            {val}
        </div>
    );
}

export default Square;