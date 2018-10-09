import ProductsTable from "../ProductsTable.vue";
import { shallowMount } from "@vue/test-utils";

describe("Testing computed properties while todos filter is active", () => {
  let wrapper,
    products,
    mountedMock,
    createdMock,
    activeClassObject,
    buttonsClassObject;
  beforeEach(() => {
    buttonsClassObject = {
      btn: true,
      "btn-sm": true,
      active: false
    };
    (activeClassObject = {
      btn: true,
      "btn-sm": true,
      active: true
    }),
      (products = [
        {
          key: "E0027",
          name: "CocaCola",
          quantity: -25,
          minimum_stock: 20,
          maximum_stock: 50,
          reorder_point: 30
        },
        {
          key: "E0028",
          name: "Fanta",
          quantity: 25,
          minimum_stock: 10,
          maximum_stock: 70,
          reorder_point: 25
        },
        {
          key: "E0029",
          name: "Seven",
          quantity: 80,
          minimum_stock: 20,
          maximum_stock: 70,
          reorder_point: 30
        }
      ]);
    createdMock = jest.fn(function() {
      this.products = products;
      this.showProducts = products;
    });
    mountedMock = jest.fn();
    wrapper = shallowMount(ProductsTable, {
      data: () => ({
        products: null,
        showProducts: null,
        activeButtonsClassObject: activeClassObject,
        buttonsClassObject: buttonsClassObject,
        isTodosActive: true,
        isDpoActive: false,
        isDminActive: false,
        isNegativeActive: false,
        searchInput: null
      }),
      created: createdMock,
      mounted: mountedMock
    });
  });
  test("test mounted was called", () => {
    expect(mountedMock.mock.calls.length).toBe(1);
  });
  test("test created was called", () => {
    expect(createdMock.mock.calls.length).toBe(1);
  });

  test("computedShowProducts returns products", () => {
    expect(wrapper.vm.computedShowProducts);
  });
  test("todosComputedClass retursn activeButtonClassObject while this.isTodosActive = true", () => {
    expect(wrapper.vm.todosComputedClass).toBe(activeClassObject);
  });

  test("dpoComputedClass returns buttonsClassObject while this.isDpoActive = false", () => {
    expect(wrapper.vm.dpoComputedClass).toBe(buttonsClassObject);
  });
  test("dminComputedClass returns buttonsClassObject while this.isDminActive = false", () => {
    expect(wrapper.vm.dminComputedClass).toBe(buttonsClassObject);
  });
  test("negativeComputedClass returns buttonsClassObject while this.isNegativeActive = false", () => {
    expect(wrapper.vm.negativeComputedClass).toBe(buttonsClassObject);
  });
});

describe("Testing compoenent methods which change the dependencies of <button>ComputedClass properties, e.g gegativeComputedClass", () => {
  let wrapper, activeButtonClassObject;
  beforeEach(() => {
    wrapper = shallowMount(ProductsTable);
    activeButtonClassObject = {
      btn: true,
      "btn-sm": true,
      active: true
    };
  });
  test("activeTodoButton change  the state to activeTodosButton", done => {
    wrapper.vm.activeTodosButton();
    expect(wrapper.vm.isTodosActive).toBe(true);
    expect(wrapper.vm.isDpoActive).toBe(false);
    expect(wrapper.vm.isDminActive).toBe(false);
    expect(wrapper.vm.isNegativeActive).toBe(false);
    expect(wrapper.vm.todosComputedClass).toEqual(activeButtonClassObject);
    done();
  });
  test("activeDpoButton change the state to activeDpoButton", done => {
    wrapper.vm.activeDpoButton();
    expect(wrapper.vm.isTodosActive).toBe(false);
    expect(wrapper.vm.isDpoActive).toBe(true);
    expect(wrapper.vm.isDminActive).toBe(false);
    expect(wrapper.vm.isNegativeActive).toBe(false);
    expect(wrapper.vm.dpoComputedClass).toEqual(activeButtonClassObject);
    done();
  });
  test("activeDminButton change the state to activeDminButton", done => {
    wrapper.vm.activeDminButton();
    expect(wrapper.vm.isTodosActive).toBe(false);
    expect(wrapper.vm.isDpoActive).toBe(false);
    expect(wrapper.vm.isDminActive).toBe(true);
    expect(wrapper.vm.isNegativeActive).toBe(false);
    expect(wrapper.vm.dminComputedClass).toEqual(activeButtonClassObject);
    done();
  });

  test("activeNegativeButton change the state to activeNegativeButton", done => {
    wrapper.vm.activeNegativeButton();
    expect(wrapper.vm.isTodosActive).toBe(false);
    expect(wrapper.vm.isDpoActive).toBe(false);
    expect(wrapper.vm.isDminActive).toBe(false);
    expect(wrapper.vm.isNegativeActive).toBe(true);
    expect(wrapper.vm.negativeComputedClass).toEqual(activeButtonClassObject);
    done();
  });
});

describe("Methods which filter this.producst accordingly with the filter that is active", () => {
  let wrapper,
    productsList,
    product1,
    product2,
    product3,
    activeDpoButtonMock,
    activeNegativeButtonMock,
    activeDminButtonMock,
    activeTodosButtonMock,
    createdMock;
  beforeEach(() => {
    activeTodosButtonMock = jest.fn();
    activeDminButtonMock = jest.fn();
    activeNegativeButtonMock = jest.fn();
    activeDpoButtonMock = jest.fn();
    product1 = {
      key: "E0027",
      name: "CocaCola",
      quantity: -25,
      minimum_stock: 20,
      maximum_stock: 50,
      reorder_point: 30
    };

    (product2 = {
      key: "E0028",
      name: "Fanta",
      quantity: 5,
      minimum_stock: 10,
      maximum_stock: 70,
      reorder_point: 25
    }),
      (product3 = {
        key: "E0029",
        name: "Seven",
        quantity: 25,
        minimum_stock: 20,
        maximum_stock: 70,
        reorder_point: 30
      });
    productsList = [product1, product2, product3];
    createdMock = jest.fn(function() {
      this.products = productsList;
      this.showProducts = productsList;
    });
    wrapper = shallowMount(ProductsTable, {
      methods: {
        activeDminButton: activeDminButtonMock,
        activeNegativeButton: activeNegativeButtonMock,
        activeDpoButton: activeDpoButtonMock,
        activeTodosButton: activeTodosButtonMock
      },
      created: createdMock
    });
  });
  test("dminFilter calls activeDminButton and computedShowProducts = [product1,product2]", done => {
    wrapper.vm.dminFilter();
    expect(activeDminButtonMock.mock.calls.length).toBe(1);
    expect(wrapper.vm.computedShowProducts).toEqual([product1, product2]);
    expect(wrapper.vm.searchInput).toBe(null);
    done();
  });
  test("DpoFilter returns productList and call activeDpoButton once", done => {
    wrapper.vm.dpoFilter();
    expect(activeDpoButtonMock.mock.calls.length).toBe(1);
    expect(wrapper.vm.computedShowProducts).toEqual(productsList);
    expect(wrapper.vm.searchInput).toBe(null);
    done();
  });
  test("negativeFilter returns [product1] and call activeNegativeButton once", done => {
    wrapper.vm.negativeFilter();
    expect(activeNegativeButtonMock.mock.calls.length).toBe(1);
    expect(wrapper.vm.computedShowProducts).toEqual([product1]);
    expect(wrapper.vm.searchInput).toBe(null);
    done();
  });
  test("search method calls activeTodosButton and check if this.searchInput is falsy or equal to '' or length < 3 ", done => {
    wrapper.vm.searchInput = "E";
    wrapper.vm.search();
    expect(activeTodosButtonMock.mock.calls.length).toBe(1);
    expect(wrapper.vm.computedShowProducts).toEqual(productsList);
    done();
  });
});
