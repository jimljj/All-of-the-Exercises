const Product = React.createClass({
  handleUpVote: function(){
    this.props.upVote(this.props.id);
  },
  handleDownVote: function(){
    this.props.downVote(this.props.id);
  },
  render: function(){
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.product_image_url} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a>
              <i className="large caret up icon" onClick={this.handleUpVote}></i>
              <i className='large caret down icon' onClick={this.handleDownVote}></i>
              {this.props.votes}
            </a>
          </div>
          <div className="description">
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  },
});

const ProductList = React.createClass({
  getInitialState: function(){
    return {
      products: [],
      toggleSwitch: true
    };
  },
  componentDidMount: function(){
    this.updateState();
  },
  updateState: function(){
    const products = Data.sort((a,b) => {
      if (this.state.toggleSwitch) {
        return b.votes - a.votes;
      } else {
        return a.votes - b.votes;
      }
    });
    this.setState({ products: products});
  },
  handleProductUpVote: function(productId){
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes += 1;
        return;
      }
    });
    this.updateState();
  },
  handleProductDownVote: function(productId){
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes -= 1;
        return;
      }
    });
    this.updateState();
  },
  sortProductByVote: function(){
    this.setState({ toggleSwitch: !this.state.toggleSwitch});
    this.updateState();
  },
  render: function(){
    const products = this.state.products.map((product) => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          upVote={this.handleProductUpVote}
          downVote={this.handleProductDownVote}
        />
      );
    });
    return (
      <div className="ui items">
        <button onClick={this.sortProductByVote}>sort direction</button>
        {products}
      </div>
    );
  },
});

ReactDOM.render(
  <ProductList/>,
  document.getElementById('content')
);
