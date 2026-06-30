---
layout: page
title: "LLM Secure Format"
permalink: /llm_security
full-width: true
---

## Formats

Model format is part of the threat model. A scanner result is useful evidence, but it does not make a model safe to load in a privileged Python process.

| Format             | Type   | Framework                     | Code execution?    | Practical security note                                                   |
| ------------------ | ------ | ----------------------------- | ------------------ | ------------------------------------------------------------------------- |
| JSON               | Text   | Interoperable                 | No direct RCE      | Safe as data, but still validate schema and size.                         |
| Numpy              | Binary | Python-based frameworks       | Depends on loader  | Avoid object arrays and pickle-enabled loading for untrusted files.        |
| Pickle             | Binary | PyTorch, scikit-learn, Pandas | Yes                | Do not load untrusted pickle. Python documents arbitrary code execution.  |
| H5/HDF5            | Binary | Keras                         | Loader risk        | Treat as parser attack surface; isolate loading for untrusted files.       |
| Protobuf           | Binary | Interoperable                 | No direct RCE      | Still parser and resource-exhaustion surface.                             |
| ONNX               | Binary | Interoperable                 | Runtime/parser risk| Prefer current ONNX Runtime, pinned ops/providers, and isolation.          |
| GGUF               | Binary | llama.cpp                     | Template/tool risk | Weights are not the only issue; chat templates and tooling are executable logic paths. |
| TorchScript        | Binary | PyTorch                       | Yes                | Treat as code-bearing. Load only from trusted provenance.                  |
| PMML               | XML    | Interoperable                 | Parser risk        | XML parsing and resource risks still apply.                               |
| Arrow              | Binary | Spark                         | Parser risk        | Data format, but still validate source and size.                          |
| MsgPack            | Binary | Flax                          | Parser risk        | Data format, but parser bugs and resource abuse are possible.             |
| joblib             | Binary | PyTorch, scikit-learn         | Yes                | Often pickle under the hood. Treat as untrusted code.                     |
| dill               | Binary | PyTorch, scikit-learn         | Yes                | More flexible than pickle and at least as dangerous for untrusted input.  |
| SavedModel         | Binary | TensorFlow                    | Loader risk        | Treat load path as code-adjacent and isolate when provenance is weak.      |
| TFLite/FlatBuffers | Binary | TensorFlow                    | Parser risk        | Smaller runtime surface, not a trust bypass.                              |
| SafeTensors        | Binary | Python-based frameworks       | No direct RCE      | Preferred for weights because it stores tensors without pickle execution. |
| POJO               | Binary | H2O                           | Yes                | Java code artifact. Treat as executable.                                  |
| MOJO               | Binary | H2O                           | Runtime risk       | Use normal runtime isolation and provenance checks.                       |


## Pickle Serialization

**Overview:**
Pickle is a Python serialization module that converts objects to a binary byte stream using opcodes. These opcodes are low-level instructions that reconstruct objects during deserialization.

**Security Warning:**
The pickle format is inherently risky because its opcodes can execute arbitrary code. An attacker could craft a malicious pickle stream that runs harmful Python commands when unpickled, making it a significant security vulnerability.

## Practical Loading Rules

- Prefer SafeTensors for model weights when the inference stack supports it.
- Do not use `trust_remote_code=True` or `--trust-remote-code` unless you reviewed the repository code and pinned the revision.
- Pin model revisions by commit hash for production, not just model name or branch.
- Verify hashes for artifacts you mirror internally.
- Load untrusted models in a container, sandbox, or VM with no secrets and minimal network.
- Treat tokenizer files, templates, model cards, and helper code as part of the supply chain.
- Keep inference runtimes patched. Safer formats still hit complex parsers.

## Sources

- [Python pickle warning](https://docs.python.org/3/library/pickle.html)
- [PyTorch serialization notes](https://pytorch.org/docs/stable/notes/serialization.html)
- [SafeTensors documentation](https://huggingface.co/docs/safetensors/index)
- [ONNX Runtime documentation](https://onnxruntime.ai/docs/)
- [llama.cpp / GGUF project](https://github.com/ggerganov/llama.cpp)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

## PyTorch Framework

**Technical Description:**
PyTorch is a computational framework for neural network development, enabling dynamic computational graph construction and efficient machine learning model training. Its flexible Python-native architecture supports advanced research in deep learning, computer vision, and artificial intelligence by providing sophisticated tensor manipulation and GPU-accelerated computational capabilities.

For a concrete demo of why this matters, see my [`fickle_pickle`](https://github.com/christian-taillon/fickle_pickle) repo. It demonstrates the core issue: a model or artifact can look like normal serialized data while the load path is capable of executing code. That is why pickle-backed model loading belongs in the same threat model as running an untrusted script.


![pickle](/image/pickle.png)
