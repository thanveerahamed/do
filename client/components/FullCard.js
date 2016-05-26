import React, { PropTypes, Component } from 'react';
import EditCardForm from './EditCardForm';
import Comments from './Comments';

class FullCard extends Component {
    constructor(props) {
        super(props);

        this.handleEditCardFormSubmit = this.handleEditCardFormSubmit.bind(this);

        this.state = {
            isEditing: false
        };
    }

    hideEditForm() {
        this.setState({
            isEditing: false
        });
    }

    showEditForm() {
        this.setState({
            isEditing: true
        });
    }

    handleEditCardFormSubmit(formData) {
        this.props.onEditCardFormSubmit(formData)
            .then(() => this.hideEditForm());
    }

    render() {
        const { isEditing } = this.state;
        const { card } = this.props;

        return (
            <div className="b-full-card">
                <div className="b-full-card__text">
                    {isEditing ? (
                        <EditCardForm
                            data={card}
                            onSubmit={this.handleEditCardFormSubmit}
                            onCancel={() => this.hideEditForm()}
                        />
                    ) : (
                        <div className="b-card-text">
                            <div className="b-card-text__text">
                                {card.text}
                            </div>
                            <a
                                className="b-card-text__edit"
                                onClick={() => this.showEditForm()}
                            >
                                Edit text
                            </a>
                        </div>
                    )}
                </div>
                <div className="b-full-card__comments">
                    <Comments
                        comments={card.comments}
                    />
                </div>
            </div>
        );
    }
};

FullCard.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }),
    onEditCardFormSubmit: PropTypes.func.isRequired
};

export default FullCard;
