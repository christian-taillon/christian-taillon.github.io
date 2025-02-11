---
layout: page
title: "LLM Security Guide"
permalink: /llm_security
---

## Formats 
Here's the complete table with GGUF included, organized by common usage:

| Format             | Type   | Framework                     | Code execution?    | Description                                                               |
| ------------------ | ------ | ----------------------------- | ------------------ | ------------------------------------------------------------------------- |
| JSON               | Text   | Interoperable                 | -                  | The standard format for web data exchange and API communication           |
| Numpy              | Binary | Python-based frameworks       | ⚠️                  | Essential Python library for numerical computations and data manipulation |
| Pickle             | Binary | PyTorch, scikit-learn, Pandas | ⚠️                  | Core Python serialization tool, but has security risks                    |
| H5/HDF5            | Binary | Keras                         | ⚠️                  | Popular format for storing large scientific datasets and arrays           |
| Protobuf           | Binary | Interoperable                 | -                  | Google's efficient data serialization system                              |
| ONNX               | Binary | Interoperable                 | ⚠️ (rare scenarios) | Standard format for exchanging ML models between frameworks               |
| GGUF               | Binary | llama.cpp                     | ⚠️ (theoretically) | Optimized format for LLMs, successor to GGML                              |
| TorchScript        | Binary | PyTorch                       | ⚠️                  | PyTorch's system for serializing and optimizing models                    |
| PMML               | XML    | Interoperable                 | -                  | Legacy standard for sharing predictive models between systems             |
| Arrow              | Binary | Spark                         | -                  | Modern format for high-performance data transfer                          |
| MsgPack            | Binary | Flax                          | -                  | Compact binary alternative to JSON                                        |
| joblib             | Binary | PyTorch, scikit-learn         | ⚠️                  | Specialized tool for saving large scientific Python objects               |
| dill               | Binary | PyTorch, scikit-learn         | ⚠️                  | Enhanced version of pickle with extended Python object support            |
| SavedModel         | Binary | TensorFlow                    | -                  | TensorFlow's native format for complete model storage                     |
| TFLite/FlatBuffers | Binary | TensorFlow                    | -                  | Compressed format for mobile/edge deployment                              |
| SafeTensors        | Binary | Python-based frameworks       | -                  | New secure format for ML model storage                                    |
| POJO               | Binary | H2O                           | ⚠️                  | Basic Java object export format                                           |
| MOJO               | Binary | H2O                           | ⚠️                  | Optimized Java model format                                               |


