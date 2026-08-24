import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateProductForm.css';

const apiBaseUrl = 'https://api.escuelajs.co/api/v1';

const initialFormState = {
    title: '',
    price: '',
    description: '',
    categoryId: '',
    imageUrl: ''
};

const CreateProductForm = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Las categorias no se han podido cargar:', error);
                setApiError('Las categorias no se han podido cargar. Por favor actualice la pagina.');
            }
        };

        fetchCategories();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Titulo es obligatorio';
        }

        if (!formData.price || Number(formData.price) <= 0) {
            newErrors.price = 'El precio debe ser un número mayor a 0';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'La descripcion es obligatoria';
        }

        if (!formData.categoryId) {
            newErrors.categoryId = 'Por favor seleccione una categoria';
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'La URL de la imagen es obligatoria';
        } else {
            try {
                new URL(formData.imageUrl);
            } catch (_) {
                newErrors.imageUrl = 'Por favor ingrese una URL valida (e.g., https://...)';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validateForm()) return;

        setIsSubmitting(true);

        const payload = {
            title: formData.title,
            price: Number(formData.price),
            description: formData.description,
            categoryId: Number(formData.categoryId),
            images: [formData.imageUrl]
        };

        try {
            await axios.post(`${apiBaseUrl}/products`, payload);
            navigate('/products');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            setApiError('Error al crear el producto. Intente nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="product-form-container">
            <h2 className="product-form-title">Crear nuevo producto</h2>

            {apiError && <div className="api-error-alert">{apiError}</div>}

            <form onSubmit={handleSubmit} className="product-form" noValidate>
                {/* Title */}
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Titulo del producto
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`form-input ${errors.title ? 'input-error' : ''}`}
                        placeholder="e.g. Audifonos Inalambricos"
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                {/* Price & Category Grid */}
                <div className="form-row">
                    {/* Price */}
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">
                            Precio ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            min="1"
                            value={formData.price}
                            onChange={handleChange}
                            className={`form-input ${errors.price ? 'input-error' : ''}`}
                            placeholder="e.g. 99"
                        />
                        {errors.price && <span className="error-message">{errors.price}</span>}
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label htmlFor="categoryId" className="form-label">
                            Categoria
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className={`form-select ${errors.categoryId ? 'input-error' : ''}`}
                        >
                            <option value="">Seleccione una categoria</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <span className="error-message">{errors.categoryId}</span>
                        )}
                    </div>
                </div>

                {/* Image URL */}
                <div className="form-group">
                    <label htmlFor="imageUrl" className="form-label">
                        URL de la imagen
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className={`form-input ${errors.imageUrl ? 'input-error' : ''}`}
                        placeholder="https://i.imgur.com/QkIa5tT.jpeg"
                    />
                    {errors.imageUrl && (
                        <span className="error-message">{errors.imageUrl}</span>
                    )}
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Descripcion
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                        placeholder="Descripcion detallada del producto"
                    />
                    {errors.description && (
                        <span className="error-message">{errors.description}</span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                >
                    {isSubmitting ? 'Creando Producto...' : 'Crear Producto'}
                </button>
            </form>
        </div>
    );
};

export default CreateProductForm;