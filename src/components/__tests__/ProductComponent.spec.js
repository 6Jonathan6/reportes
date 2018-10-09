import ProductComponent from "../ProductComponent.vue";
import { shallowMount } from "@vue/test-utils";

describe("Passing a product prop to ProductComponent from its parent when product.quantity is positive", () => {
  let product, wrapper;

  const positiveObject = {
    range: true,
    one: true,
    none: true
  };

  beforeEach(() => {
    product = {
      key: "E0025",
      name: "CocaCola",
      quantity: 25,
      minimum_stock: 20,
      maximum_stock: 50,
      reorder_point: 30
    };
    wrapper = shallowMount(ProductComponent, {
      propsData: { product }
    });
  });

  test("Passing a product to ProductComponent.vue", () => {
    expect(wrapper.props().product).toEqual(product);
  });

  test("IsNegative computed prop returns positiveObject 'css classes' since our product has a positive quantity ", () => {
    expect(wrapper.vm.isNegativeObject).toEqual(positiveObject);
  });

  test("isPositiveAndLessThanMinimum computed prop returns false since 0 < product.minimum_stock(20) < product.quantity (25)", () => {
    expect(wrapper.vm.isPositiveAndLessThanMinimum).toBe(false);
  });
  test("isGreaterThanMinAndLesThanPo computed prop returns true since  0 < product.minimum_stock(20) < product.quantity (25) < product.reorder_point(30)", () => {
    expect(wrapper.vm.isGreaterThanMinAndLesThanPo).toBe(true);
  });
  test("isGreaterThanPoAndLessThanMax computed prop returns false since product.quantity(25) < product.reorder_point(30)", () => {
    expect(wrapper.vm.isGreaterThanPoAndLessThanMax).toBe(false);
  });
  test("isGreaterThanMax computed prop returns false since product.quantity(25) < product.reorder_point(30) < product.maximum_stock(50)", () => {
    expect(wrapper.vm.isGreaterThanMax).toBe(false);
  });
});

describe("Passing a product prop to ProductComponent where product.quantity is a negative number", () => {
  let wrapper, product, negativeObject;
  beforeEach(() => {
    negativeObject = {
      range: true,
      one: true,
      none: false
    };
    product = {
      key: "E0025",
      name: "CocaCola",
      quantity: -25,
      minimum_stock: 20,
      maximum_stock: 50,
      reorder_point: 30
    };
    wrapper = shallowMount(ProductComponent, {
      propsData: { product }
    });
  });

  test("IsNegativeObject computed prop returns nefativeObject 'css classes' since our product has a negative quantity", () => {
    expect(wrapper.vm.isNegativeObject).toEqual(negativeObject);
  });
});
