import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    CircularProgress,
    Alert,
    Snackbar,
    MenuItem,
    Select,
    FormControl,
    Typography,
    Switch,
    FormControlLabel
} from '@mui/material';
import Button from '@mui/material/Button';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from '../../../components/forms/theme-elements/CustomOutlinedInput';
import {
    getServiceById,
    updateService,
    getAllServices
} from '../../../services/servicesService';
import { useNavigate, useParams } from 'react-router';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const ServiceEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        sequence: '',
        metaTitle: '',
        metaDescription: '',
        description: '',
        image: '',
        relatedServices: [],
        clientsAssisted: '',
        highlight: '',
        startingFrom: '',
        fullDescription: '',
        shortDescriptionPoints: '',
        showOnHomePage: false,
        homePageTag: '',
        homePageTitle: '',
        homePageDescription: '',
        homePageImage: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const [selectedHomePageFile, setSelectedHomePageFile] = useState(null);
    const [homePageFilePreview, setHomePageFilePreview] = useState('');
    const [stats, setStats] = useState([{ label: '', value: '' }]);
    const [faqs, setFaqs] = useState([]);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchServicesAndData = async () => {
            try {
                const servicesRes = await getAllServices();

                if (servicesRes.data && servicesRes.data.data) {
                    setServices(servicesRes.data.data);
                } else if (servicesRes.data) {
                    setServices(servicesRes.data);
                }

                const res = await getServiceById(id);
                const data = res.data?.data || res.data;

                if (data) {
                    setFormData({
                        name: data.name || '',
                        title: data.title || '',
                        sequence: data.sequence || '',
                        metaTitle: data.metaTitle || '',
                        metaDescription: data.metaDescription || '',
                        description: data.description || '',
                        image: data.image || '',
                        relatedServices: data.relatedServices
                            ? data.relatedServices.map(s =>
                                typeof s === 'object' ? s._id : s
                            )
                            : [],
                        clientsAssisted: data.clientsAssisted || '',
                        highlight: data.highlight || '',
                        startingFrom: data.startingFrom || '',
                        fullDescription: data.fullDescription || '',
                        shortDescriptionPoints: data.shortDescriptionPoints
                            ? data.shortDescriptionPoints.join('\n')
                            : '',
                        showOnHomePage: data.showOnHomePage || false,
                        homePageTag: data.homePage?.tag || '',
                        homePageTitle: data.homePage?.title || '',
                        homePageDescription: data.homePage?.description || '',
                        homePageImage: data.homePage?.image || ''
                    });

                    if (data.homePage?.stats && data.homePage.stats.length > 0) {
                        setStats(data.homePage.stats);
                    } else {
                        setStats([{ label: '', value: '' }]);
                    }

                    if (data.faqs && data.faqs.length > 0) {
                        setFaqs(data.faqs);
                    } else {
                        setFaqs([]);
                    }

                    const rawBackendUrl =
                        import.meta.env.VITE_BASE_BACKEND_URL || '';
                    const baseUrl = rawBackendUrl.replace(
                        /\/api\/v1\/?$/,
                        ''
                    );

                    if (data.image) {
                        const relativePath = data.image.startsWith('/')
                            ? data.image
                            : `/${data.image}`;

                        const imageUrl = data.image.startsWith('http')
                            ? data.image
                            : `${baseUrl}${relativePath}`;

                        setFilePreview(imageUrl);
                    }

                    if (data.homePage?.image) {
                        const relativePath = data.homePage.image.startsWith('/')
                            ? data.homePage.image
                            : `/${data.homePage.image}`;

                        const imageUrl = data.homePage.image.startsWith('http')
                            ? data.homePage.image
                            : `${baseUrl}${relativePath}`;

                        setHomePageFilePreview(imageUrl);
                    }
                }
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setFetchLoading(false);
            }
        };

        if (id) {
            fetchServicesAndData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleStatChange = (index, field, val) => {
        setStats(prev => {
            const copy = [...prev];
            copy[index][field] = val;
            return copy;
        });
    };

    const handleAddStat = () => {
        setStats(prev => [...prev, { label: '', value: '' }]);
    };

    const handleRemoveStat = (index) => {
        setStats(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddFaq = () => {
        setFaqs(prev => [...prev, { question: '', answer: '' }]);
    };

    const handleFaqChange = (index, field, val) => {
        setFaqs(prev => {
            const copy = [...prev];
            copy[index][field] = val;
            return copy;
        });
    };

    const handleRemoveFaq = (index) => {
        setFaqs(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        if (
            !formData.name ||
            !formData.title ||
            !formData.description
        ) {
            setError('Please fill all required fields');
            return false;
        }

        // Sequence is optional
        if (
            formData.sequence !== '' &&
            (
                !Number.isInteger(Number(formData.sequence)) ||
                Number(formData.sequence) < 1
            )
        ) {
            setError('Sequence must be a positive integer');
            return false;
        }

        if (formData.showOnHomePage) {
            if (!formData.homePageTag || !formData.homePageTitle || !formData.homePageDescription) {
                setError('Please fill all Home Page required fields (Tag, Title, Description)');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            const data = new FormData();

            data.append('name', formData.name);
            data.append('title', formData.title);

            // Only send sequence if provided
            if (formData.sequence !== '') {
                data.append('sequence', formData.sequence);
            }

            data.append('metaTitle', formData.metaTitle);
            data.append('metaDescription', formData.metaDescription);

            data.append('description', formData.description);

            data.append(
                'clientsAssisted',
                formData.clientsAssisted
            );

            data.append(
                'highlight',
                formData.highlight
            );

            data.append(
                'startingFrom',
                formData.startingFrom
            );

            data.append(
                'fullDescription',
                formData.fullDescription
            );

            if (selectedFile) {
                data.append('image', selectedFile);
            } else {
                data.append('image', formData.image);
            }

            data.append('showOnHomePage', formData.showOnHomePage);

            const homePageData = {
                tag: formData.homePageTag,
                title: formData.homePageTitle,
                description: formData.homePageDescription,
                stats: stats.filter(s => s.label && s.value)
            };

            data.append('homePage', JSON.stringify(homePageData));

            if (selectedHomePageFile) {
                data.append('homePageImage', selectedHomePageFile);
            } else if (formData.homePageImage) {
                data.append('homePageImage', formData.homePageImage);
            }

            data.append('relatedServices', JSON.stringify(formData.relatedServices));

            const points = formData.shortDescriptionPoints
                ? formData.shortDescriptionPoints.split('\n').map(p => p.trim()).filter(p => p !== '')
                : [];
            data.append('shortDescriptionPoints', JSON.stringify(points));

            const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());
            data.append('faqs', JSON.stringify(validFaqs));

            const res = await updateService(id, data);

            if (res.status === 200 || res.data) {
                setSuccess(true);

                setTimeout(() => {
                    navigate('/dashboard/services/list');
                }, 1500);
            }
        } catch (error) {
            const errDetails =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.response?.data?.details ||
                error.message;

            setError(errDetails || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
        setError('');
    };

    const BCrumb = [
        { to: '/', title: 'Home' },
        { to: '/dashboard/services/list', title: 'Services' },
        { title: 'Edit Service' },
    ];

    if (fetchLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={5}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Breadcrumb
                title="Edit Service"
                items={BCrumb}
            />

            <Grid container spacing={3}>

                {/* Name */}
                <Grid size={{ xs: 12, sm: 4 }}>
                    <CustomFormLabel htmlFor="name">
                        Name *
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Title */}
                <Grid size={{ xs: 12, sm: 4 }}>
                    <CustomFormLabel htmlFor="title">
                        Title *
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="title"
                        name="title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Sequence */}
                <Grid size={{ xs: 12, sm: 4 }}>
                    <CustomFormLabel htmlFor="sequence">
                        Sequence
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="sequence"
                        name="sequence"
                        type="number"
                        fullWidth
                        inputProps={{ min: 1 }}
                        placeholder="Leave empty to keep current sequence"
                        value={formData.sequence}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography variant="h5" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #ddd', pb: 1 }}>
                        Home Page Settings
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                name="showOnHomePage"
                                checked={formData.showOnHomePage}
                                onChange={(e) => setFormData(prev => ({ ...prev, showOnHomePage: e.target.checked }))}
                            />
                        }
                        label="Show on Home Page"
                    />
                </Grid>

                {formData.showOnHomePage && (
                    <>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomFormLabel htmlFor="homePageTag">Home Page Tag *</CustomFormLabel>
                            <CustomOutlinedInput
                                id="homePageTag"
                                name="homePageTag"
                                fullWidth
                                placeholder="e.g. LOAN ISSUES"
                                value={formData.homePageTag}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomFormLabel htmlFor="homePageTitle">Home Page Title *</CustomFormLabel>
                            <CustomOutlinedInput
                                id="homePageTitle"
                                name="homePageTitle"
                                fullWidth
                                placeholder="e.g. Personal Loan Settlement"
                                value={formData.homePageTitle}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <CustomFormLabel htmlFor="homePageDescription">Home Page Description *</CustomFormLabel>
                            <CustomOutlinedInput
                                id="homePageDescription"
                                name="homePageDescription"
                                multiline
                                rows={3}
                                fullWidth
                                placeholder="Enter description for the home page cards..."
                                value={formData.homePageDescription}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12 }}>
                            <CustomFormLabel htmlFor="homePageImage">Home Page Image (Optional)</CustomFormLabel>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Button variant="outlined" component="label">
                                    Choose Home Page Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setSelectedHomePageFile(file);
                                                setHomePageFilePreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </Button>
                                {selectedHomePageFile ? (
                                    <Typography variant="body2" color="textSecondary">
                                        {selectedHomePageFile.name}
                                    </Typography>
                                ) : formData.homePageImage ? (
                                    <Typography variant="body2" color="textSecondary">
                                        Existing home page image loaded
                                    </Typography>
                                ) : null}
                            </Box>
                            {homePageFilePreview && (
                                <Box mt={2}>
                                    <img
                                        src={homePageFilePreview}
                                        alt="Home Page Preview"
                                        style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px', objectFit: 'cover' }}
                                    />
                                </Box>
                            )}
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                Home Page Stats
                            </Typography>
                            {stats.map((stat, index) => (
                                <Box key={index} display="flex" gap={2} alignItems="center" mb={2}>
                                    <Box flex={1}>
                                        <CustomOutlinedInput
                                            placeholder="Stat Label (e.g. CASES)"
                                            fullWidth
                                            value={stat.label}
                                            onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                        />
                                    </Box>
                                    <Box flex={1}>
                                        <CustomOutlinedInput
                                            placeholder="Stat Value (e.g. 2,500+)"
                                            fullWidth
                                            value={stat.value}
                                            onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                        />
                                    </Box>
                                    <Button variant="outlined" color="error" onClick={() => handleRemoveStat(index)}>
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                            <Button variant="outlined" color="primary" onClick={handleAddStat}>
                                Add Stat
                            </Button>
                        </Grid>
                    </>
                )}

                <Grid size={{ xs: 12, sm: 6 }}>
                    <CustomFormLabel htmlFor="metaTitle">
                        Meta Title
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="metaTitle"
                        name="metaTitle"
                        fullWidth
                        placeholder="Enter SEO meta title..."
                        value={formData.metaTitle}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <CustomFormLabel htmlFor="metaDescription">
                        Meta Description
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="metaDescription"
                        name="metaDescription"
                        fullWidth
                        placeholder="Enter SEO meta description..."
                        value={formData.metaDescription}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <CustomFormLabel htmlFor="description">
                        Description *
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="description"
                        name="description"
                        multiline
                        rows={4}
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <CustomFormLabel htmlFor="clientsAssisted">
                        Clients Assisted
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="clientsAssisted"
                        name="clientsAssisted"
                        placeholder="e.g. 2,500+"
                        fullWidth
                        value={formData.clientsAssisted}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <CustomFormLabel htmlFor="highlight">
                        Highlight
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="highlight"
                        name="highlight"
                        placeholder="e.g. Fast eligibility guidance"
                        fullWidth
                        value={formData.highlight}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <CustomFormLabel htmlFor="startingFrom">
                        Starting From
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="startingFrom"
                        name="startingFrom"
                        placeholder="e.g. ₹1,999"
                        fullWidth
                        value={formData.startingFrom}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <CustomFormLabel htmlFor="fullDescription">
                        Full Description
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="fullDescription"
                        name="fullDescription"
                        multiline
                        rows={6}
                        placeholder="Enter full description details..."
                        fullWidth
                        value={formData.fullDescription}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <CustomFormLabel htmlFor="shortDescriptionPoints">
                        Short Description Points (One point per line)
                    </CustomFormLabel>

                    <CustomOutlinedInput
                        id="shortDescriptionPoints"
                        name="shortDescriptionPoints"
                        multiline
                        rows={4}
                        placeholder="Eligibility Checking Based On Income&#10;Guidance For Salaried Applicants&#10;Assistance With Document Preparation"
                        fullWidth
                        value={formData.shortDescriptionPoints}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <CustomFormLabel htmlFor="image">
                        Service Image *
                    </CustomFormLabel>

                    <Box display="flex" alignItems="center" gap={2}>
                        <Button variant="outlined" component="label">
                            Choose Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>

                        {selectedFile ? (
                            <Typography variant="body2" color="textSecondary">
                                {selectedFile.name}
                            </Typography>
                        ) : formData.image ? (
                            <Typography variant="body2" color="textSecondary">
                                Existing image loaded
                            </Typography>
                        ) : null}
                    </Box>

                    {filePreview && (
                        <Box mt={2}>
                            <img
                                src={filePreview}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px', objectFit: 'cover' }}
                            />
                        </Box>
                    )}
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <CustomFormLabel htmlFor="relatedServices">
                        Related Services
                    </CustomFormLabel>

                    <FormControl fullWidth>
                        <Select
                            id="relatedServices"
                            name="relatedServices"
                            multiple
                            value={formData.relatedServices}
                            onChange={handleChange}
                            displayEmpty
                        >
                            {services.map((service) => (
                                <MenuItem key={service._id || service.id} value={service._id || service.id}>
                                    {service.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography variant="h5" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #ddd', pb: 1 }}>
                        Service FAQs (Optional)
                    </Typography>
                    {faqs.map((faq, index) => (
                        <Box key={index} display="flex" flexDirection="column" gap={2} mb={3} p={2} border="1px solid #e0e0e0" borderRadius="8px">
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle1" fontWeight={600}>
                                    FAQ #{index + 1}
                                </Typography>
                                <Button variant="outlined" color="error" size="small" onClick={() => handleRemoveFaq(index)}>
                                    Remove FAQ
                                </Button>
                            </Box>
                            <CustomFormLabel htmlFor={`faq-q-${index}`}>Question</CustomFormLabel>
                            <CustomOutlinedInput
                                id={`faq-q-${index}`}
                                placeholder="Enter question..."
                                fullWidth
                                value={faq.question}
                                onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                            />
                            <CustomFormLabel htmlFor={`faq-a-${index}`}>Answer</CustomFormLabel>
                            <CustomOutlinedInput
                                id={`faq-a-${index}`}
                                placeholder="Enter answer..."
                                multiline
                                rows={3}
                                fullWidth
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                            />
                        </Box>
                    ))}
                    <Button variant="outlined" color="primary" onClick={handleAddFaq}>
                        Add FAQ
                    </Button>
                </Grid>

                <Grid item size={{ xs: 12 }} mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Update Service'}
                    </Button>
                </Grid>
            </Grid>

            <Snackbar
                open={!!error || success}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                {error ? (
                    <Alert onClose={handleCloseSnackbar} severity="error">{error}</Alert>
                ) : (
                    <Alert onClose={handleCloseSnackbar} severity="success">Service updated successfully!</Alert>
                )}
            </Snackbar>
        </div>
    );
};

export default ServiceEdit;
