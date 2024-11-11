import React from 'react'
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({ handleSubmit, handleChange, values , setValues, handleCategoryChange, subOptions ,showSubs }) => {

    // destructure
    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
    } = values;
    return (
        <form onSubmit={handleSubmit} className="">
            <div className="form-group mb-3">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control "
                    value={values.title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-3">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={values.description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-3">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={values.price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-3">
                <label>Shipping</label>
                <select
                    name="shipping"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="form-group mb-3">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={values.quantity}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-3">
                <label>Color</label>
                <select
                    name="color"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    {values.colors.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mb-3">
                <label>Brand</label>
                <select
                    name="brand"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    {values.brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mb-3">
            <label> category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleCategoryChange}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          
      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={subs}
          onChange={(value) => setValues({ ...values, subs: value })}
        >
                      {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
        </Select>
      </div>

            <br />
            <button className="btn btn-outline-info">Save</button>
        </form>
    )
}

export default ProductCreateForm