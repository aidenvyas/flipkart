import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as actions from "../state/actions";
import { bindActionCreators } from "redux";
import { Spinner } from "reactstrap";
import Search from "./UI/Search";
import Helper from "./UI/ProductCardHelper";
class Products extends PureComponent {
  componentWillMount() {
    !(
      this.props.categories.productsByCategory.length ||
      this.props.products.products.length
    ) && this.props.dispatchers.fetchProducts();
  }

  render() {
    const Heading = (
      <div>
        <h2>Products</h2>
        <hr />
        <h3>Filter:</h3>
        <input
          type="search"
          onChange={e => this.props.dispatchers.searchValue(e.target.value)}
        />
        <hr />
      </div>
    );

    if (this.props.products.isFetching) {
      return (
        <React.Fragment>
          {Heading}
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        </React.Fragment>
      );
    }

    const showProducts = this.props.categories.productsByCategory.length
      ? this.props.categories.productsByCategory
      : this.props.products.products;

    const { products, ...rest } = this.props;

    return (
      <div>
        {Heading}
        {products.searchValue ? (
          <Search
            searchValue={products.searchValue}
            products={showProducts}
            {...rest}
          />
        ) : (
          <Helper products={showProducts} {...rest} />
        )}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    products: state.products,
    cart: state.cart,
    categories: state.categories
  };
};

let mapDisptachToProps = (dispatch, getState) => {
  return {
    dispatchers: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Products);
