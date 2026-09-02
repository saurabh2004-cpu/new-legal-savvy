import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert, Button, Snackbar, Typography } from '@mui/material';
import { Link } from 'react-router';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ProductTableList from '../../../components/apps/ecommerce/ProductTableList/ProductTableList';
import { getAllLabels, deleteLabel, importLabels } from '../../../services/labelService';

const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Labels' },
];

const LabelsList = () => {
    const headCells = [
        { id: 'Actions', numeric: false, disablePadding: false, label: 'Actions' },
        { id: 'image', numeric: false, disablePadding: false, label: 'Image' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
        { id: 'isFeatured', numeric: false, disablePadding: false, label: 'Is Featured' },
        { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created Date' },
    ];

    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('');
    
    // Import states
    const [importing, setImporting] = useState(false);
    const [importSuccess, setImportSuccess] = useState('');
    const [importError, setImportError] = useState('');
    const [skippedFileUrl, setSkippedFileUrl] = useState('');
    const [importDetails, setImportDetails] = useState(null);

    const typeFilterOptions = [
        { label: 'All Types', value: '' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
        { label: 'Bank', value: 'bank' }
    ];

    const fetchList = async (type = '') => {
        setLoading(true);
        try {
            const response = await getAllLabels(type);
            if (response.data && response.data.data) {
                setTableData(response.data.data);
            } else if (response.data) {
                setTableData(response.data);
            }
        } catch (error) {
            console.error('Error fetching list:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchList(selectedType);
    }, [selectedType]);

    const handleTypeFilterChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleImportFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setImporting(true);
        setImportError('');
        setImportSuccess('');
        setSkippedFileUrl('');
        setImportDetails(null);

        try {
            const response = await importLabels(file);
            const data = response.data?.data;
            if (data) {
                setImportDetails({
                    totalRows: data.totalRows,
                    importedRows: data.importedRows,
                    skippedRows: data.skippedRows,
                });
                
                if (data.skippedRows > 0 && data.skippedFileUrl) {
                    const backendUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3001';
                    setSkippedFileUrl(`${backendUrl}${data.skippedFileUrl.startsWith('/') ? '' : '/'}${data.skippedFileUrl}`);
                    setImportError(`Imported ${data.importedRows} rows, but skipped ${data.skippedRows} rows.`);
                } else {
                    setImportSuccess(`Successfully imported ${data.importedRows} rows!`);
                }
                
                // Refresh table
                fetchList(selectedType);
            }
        } catch (error) {
            const errDetails = error.response?.data?.message || error.response?.data?.error || error.message;
            setImportError(errDetails || 'Failed to import Excel file');
        } finally {
            setImporting(false);
            // Reset file input
            event.target.value = null;
        }
    };

    const handleCloseSnackbar = () => {
        setImportSuccess('');
        setImportError('');
    };

    return (
        <PageContainer title="Labels List" description="This is the Labels List page">
            <Breadcrumb title="Labels List" items={BCrumb}>
                <Box display="flex" gap={2} alignItems="center">
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        component="label"
                        disabled={importing}
                    >
                        {importing ? <CircularProgress size={24} /> : 'Import Excel'}
                        <input
                            type="file"
                            hidden
                            accept=".xlsx, .xls"
                            onChange={handleImportFileChange}
                        />
                    </Button>
                    <Button component={Link} to="/dashboard/labels/create" variant="contained" color="primary">
                        Add New Label
                    </Button>
                </Box>
            </Breadcrumb>
            {importDetails && (
                <Alert severity={importDetails.skippedRows > 0 ? "warning" : "success"} sx={{ mb: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Import Results</Typography>
                            <Typography>Total Rows: {importDetails.totalRows}</Typography>
                            <Typography>Imported: {importDetails.importedRows}</Typography>
                            <Typography>Skipped: {importDetails.skippedRows}</Typography>
                        </Box>
                        {skippedFileUrl && importDetails.skippedRows > 0 && (
                            <Button 
                                variant="contained" 
                                color="warning" 
                                size="small" 
                                href={skippedFileUrl}
                                target="_blank"
                                download
                            >
                                Download Skipped Records
                            </Button>
                        )}
                    </Box>
                </Alert>
            )}
            <Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={5}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box mt={3}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                ) : (
                    <ProductTableList
                        showCheckBox={false}
                        headCells={headCells}
                        tableData={tableData}
                        isLabelsList={true}
                        setTableData={setTableData}
                        onDelete={deleteLabel}
                        statusFilter={selectedType}
                        onStatusFilterChange={handleTypeFilterChange}
                        statusFilterOptions={typeFilterOptions}
                    />
                )}
            </Box>
            
            <Snackbar
                open={!!importSuccess || !!importError}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                {importError ? (
                    <Alert onClose={handleCloseSnackbar} severity={skippedFileUrl ? "warning" : "error"}>{importError}</Alert>
                ) : (
                    <Alert onClose={handleCloseSnackbar} severity="success">{importSuccess}</Alert>
                )}
            </Snackbar>
        </PageContainer>
    );
};

export default LabelsList;
